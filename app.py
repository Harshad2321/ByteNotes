# app.py
import streamlit as st
from utils import load_llm

st.set_page_config(page_title="Hackathon AI Assistant", layout="wide")
st.title("💡 Hackathon Demo - AI Assistant")

# Sidebar for settings
st.sidebar.header("⚙️ Settings")
model_choice = st.sidebar.radio("Select Model", ["Mistral (fast via API)", "OSS (offline demo)"])

# Load model only once
if "llm" not in st.session_state:
    st.session_state.llm = None

if st.sidebar.button("🚀 Load Model"):
    with st.spinner("Loading model... please wait ⏳"):
        if "Mistral" in model_choice:
            st.session_state.llm = load_llm("mistral")
        else:
            st.session_state.llm = load_llm("oss")
    st.success("✅ Model ready!")

# Main chat area
st.subheader("💬 Ask me anything:")
user_query = st.text_input("Type your question:")

if user_query:
    if st.session_state.llm is None:
        st.warning("⚠️ Please load a model first from the sidebar.")
    else:
        with st.spinner("Thinking... 🤔"):
            response = st.session_state.llm(user_query)
        st.write("### 🤖 Response:")
        st.write(response)
