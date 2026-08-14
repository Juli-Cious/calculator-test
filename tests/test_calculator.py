import os
import pytest
from bs4 import BeautifulSoup

def test_app_js_exists():
    assert os.path.exists("app/js/app.js")

def test_app_js_content():
    with open("app/js/app.js", "r", encoding="utf-8") as f:
        content = f.read()
    
    assert "currentInput" in content
    assert "previousOperand" in content
    assert "currentOperator" in content
    assert "num-btn" in content
    assert "op-btn" in content
    assert "clear-btn" in content
    assert "equals-btn" in content
    assert "display-screen" in content
    assert "+" in content
    assert "-" in content
    assert "*" in content or "×" in content
    assert "/" in content or "÷" in content

def test_index_html_has_calculator_elements():
    with open("app/index.html", "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    assert soup.find(id='display-screen') is not None
    assert soup.find(id='clear-btn') is not None
    assert soup.find(id='equals-btn') is not None
    assert len(soup.find_all(class_='num-btn')) >= 10
    assert len(soup.find_all(class_='op-btn')) >= 4
