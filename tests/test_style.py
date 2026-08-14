import os

def test_style_file_exists():
    assert os.path.exists("app/style.css")

def test_style_content_has_grid_and_dark_theme():
    with open("app/style.css", "r", encoding="utf-8") as f:
        content = f.read()
    
    assert "display: grid" in content or "display:grid" in content
    assert "grid-template-columns" in content
    assert "background-color" in content
    assert "@media" in content
    assert "transform: scale" in content or "transform:scale" in content
