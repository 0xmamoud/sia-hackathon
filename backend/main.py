import os
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from utils.output_model_class import InformationsStandard
from runner import Runner
from steps.read_and_convert import ReadAndConvert
from steps.extract import Extract
from pydantic import BaseModel

load_dotenv()

MODEL = os.getenv("MODEL")
MAX_TOKENS=os.getenv("MAX_TOKENS")
MAX_OUTPUT_TOKENS=os.getenv("MAX_TOKENS")

# FastAPI
app = FastAPI()

# request body structure
class ProcessInput(BaseModel):
    path: str
    name: str

@app.post("/run-process/")
async def run_process(input_data: ProcessInput):
    try:
        runner = Runner()
        
        output_struct_dict = {"standard": InformationsStandard}
        
        llm_config = {
            "temperature": 0.0,
            "max_tokens": MAX_TOKENS,
            "max_output_tokens": MAX_OUTPUT_TOKENS,
            "model": MODEL,
            "struct_output": output_struct_dict,
        }
        
        runner.add(ReadAndConvert(description="Read files and convert them into PDF"))
        # runner.add(Extract(config=llm_config, description="Extract information from documents"))
        
        result = runner.run(
            initial_input={
                "path": input_data.path,
                "name": input_data.name,
            }
        )
        
        return {"status": "success", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



# if __name__ == "__main__":
    
#     runner = Runner()
    
#     output_struct_dict = {"standard": InformationsStandard}
    
#     llm_config = {
#         "temperature": 0.0,
#         "max_tokens": MAX_TOKENS,
#         "max_output_tokens": MAX_OUTPUT_TOKENS,
#         "model": MODEL,
#         "struct_output": output_struct_dict,
#     }
    
#     runner.add(ReadAndConvert(description="Read files and convert them into PDF"))
#     runner.add(Extract(config=llm_config, description="Extract information from documents"))

#     result = runner.run(
#         initial_input={
#             "path": "data/baux",
#             "name": "bail_1.pdf",
#         },
#     )
    
#     # result = runner.run(
#     #     initial_input={
#     #         "converted_files": {"bail_1": "data/baux/bail_1.md"},
#     #     },
#     # )
    