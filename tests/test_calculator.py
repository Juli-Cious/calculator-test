import os
from bs4 import BeautifulSoup

def test_style_css_exists():
    assert os.path.exists("app/style.css")

def test_style_css_rules():
    with open("app/style.css", "r", encoding="utf-8") as f:
        content = f.read()
    
    assert "#display-screen" in content
    assert "#keypad" in content
    assert "button" in content
    assert "background-color" in content
    assert "grid" in content or "flex" in content
    assert ":root" in content
    # MINI-41 history styles
    assert "#history-panel" in content
    assert "#history-list" in content
    assert "#clear-history-btn" in content
    assert ".history-item" in content

def test_index_html_links_css_and_js():
    with open("app/index.html", "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    css_link = soup.find('link', href='app/style.css')
    assert css_link is not None
    
    js_script = soup.find('script', src='app/js/app.js')
    assert js_script is not None
