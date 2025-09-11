# utils.py
import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

# Load env vars
load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

def load_llm(model_choice="mistral"):
    if model_choice == "mistral":
        if not HF_TOKEN:
            raise ValueError("HF_TOKEN is missing. Please add it to .env.")

        client = InferenceClient(
            "mistralai/Mistral-7B-Instruct-v0.2",
            token=HF_TOKEN
        )

        def llm(prompt: str) -> str:
            try:
                completion = client.chat.completions.create(
                    model="mistralai/Mistral-7B-Instruct-v0.2",
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=300
                )
                return completion.choices[0].message["content"]
            except Exception as e:
                return f"⚠️ Mistral API failed: {e}"

        return llm

    else:
        def llm(prompt: str) -> str:
            return f"(Offline Demo Mode) You asked: '{prompt}'. Imagine a smart answer here 😉"
        return llm
