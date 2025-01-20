import os
import re
from dotenv import load_dotenv
load_dotenv()
from typing import Any, Dict
from prompts import load_config
from runner import Step
from openai import OpenAI
from utils.extract_handler import ExtractHandler


client_openai = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),  # This is the default and can be omitted
)


CASE_PROMPT_PATH = os.getenv("CASE_PROMPT_PATH")

class Extract(Step):
    def __init__(self, **kwargs):
        super().__init__(input_keys=["converted_files"], **kwargs)
        # TODO: Add any additional initialization code here, LLM configs, etc.
        self.config = kwargs.get("config", {})
        self.system_prompt = load_config(CASE_PROMPT_PATH)
    
    def process_document(self, doc_path: str, system_prompt, config: Dict[str, Any], client_openai) -> Dict[str, Any]:
        """
        To process a single document with the given system prompt and config.
        """
        # First step - Standard analysis
        sys_prompt = system_prompt["Standard"]["system_prompt"]
        extractor = ExtractHandler(config, sys_prompt, "standard")
        
        document_processed = extractor.process_document(doc_path, client_openai)
        return document_processed

    def run(self, input_data: Dict[str, Any], **runtime_args) -> Dict[str, Any]:
        self.validate_input(input_data)
        
        results = {}
        for json_file in input_data["converted_files"].values():
            try:
                result = self.process_document(json_file, self.system_prompt, self.config, client_openai)
                results[json_file] = result
                print(f"Processed {json_file}: {result}")
            except RuntimeError as e:
                print(e)