# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'projet_gl'
copyright = '2024, mouhamidz'
author = 'mouhamidz'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'sphinx.ext.autodoc',
    # ... autres extensions ...
]

templates_path = ['_templates']
exclude_patterns = []

language = 'francais'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'alabaster'
html_static_path = ['_static']
import os
import sys
sys.path.insert(0, os.path.abspath('../'))  # Ajustez le chemin vers le répertoire contenant votre projet Django
os.environ['DJANGO_SETTINGS_MODULE'] = 'backendapi.settings'  # Remplacez par les paramètres de votre projet Django