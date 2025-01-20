import yaml
import os
from typing import List

def load_config(config_file_name: str) -> dict:
    """
    Loads configuration from the specified YAML file.

    Args:
        config_file_name (str): Name of the configuration file.

    Returns:
        dict: The configuration loaded from the YAML file.
    """
    config_file_path = os.path.join(os.path.dirname(__file__), config_file_name)
    with open(config_file_path, 'r') as config_file:
        config = yaml.safe_load(config_file)
    return config