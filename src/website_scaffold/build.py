# encoding: utf-8
import re
import jinja2
import jinja2.ext
import markdown2
import os
import sys
sys.path.append(".")

from staticjinja import make_site
from BeautifulSoup import BeautifulSoup, BeautifulStoneSoup

# remove annoying characters
def cleanitup(text):
  chars = {
      '\xe2': '',
      '\x80': '',
      '\x94': '',
      '\x9c': '',
      '\xc2\x82' : ',',        # High code comma
      '\xc2\x84' : ',,',       # High code double comma
      '\xc2\x85' : '...',      # Tripple dot
      '\xc2\x88' : '^',        # High carat
      '\xc2\x91' : '\x27',     # Forward single quote
      '\xc2\x92' : '\x27',     # Reverse single quote
      '\xc2\x93' : '\x22',     # Forward double quote
      '\xc2\x94' : '\x22',     # Reverse double quote
      '\xc2\x95' : ' ',
      '\xc2\x96' : '-',        # High hyphen
      '\xc2\x97' : '--',       # Double hyphen
      '\xc2\x99' : ' ',
      '\xc2\xa0' : ' ',
      '\xc2\xa6' : '|',        # Split vertical bar
      '\xc2\xab' : '<<',       # Double less than
      '\xc2\xbb' : '>>',       # Double greater than
      '\xc2\xbc' : '1/4',      # one quarter
      '\xc2\xbd' : '1/2',      # one half
      '\xc2\xbe' : '3/4',      # three quarters
      '\xca\xbf' : '\x27',     # c-single quote
      '\xcc\xa8' : '',         # modifier - under curve
      '\xcc\xb1' : ''          # modifier - under line
  }
  def replace_chars(match):
      char = match.group(0)
      return chars[char]
  return re.sub('(' + '|'.join(chars.keys()) + ')', replace_chars, text)



class Markdown2Extension(jinja2.ext.Extension):
    tags = set(['markdown2'])

    def __init__(self, environment):
        super(Markdown2Extension, self).__init__(environment)
        environment.extend(
            markdowner=markdown2.Markdown()
        )   

    def parse(self, parser):
        lineno = parser.stream.next().lineno
        body = parser.parse_statements(
            ['name:endmarkdown2'],
            drop_needle=True
        )
        ret = jinja2.nodes.CallBlock(
            self.call_method('_markdown_support'),
            [],
            [],
            body
        ).set_lineno(lineno)
        return ret

    def _markdown_support(self, caller):
        ret = self.environment.markdowner.convert(caller()).strip()
        return ret

env = jinja2.Environment(extensions=[Markdown2Extension])


def get_post_contents(template):
    with open(template.filename) as f:
        contents = f.read()
        if 'paper_' in template.filename:
          decoded = BeautifulSoup(contents)#, smartQuotesTo=None)
          contents = u'\n'.join(map(unicode, decoded.contents))
          contents = contents.encode('ascii', errors='ignore')
          contents = re.sub("\@", "", contents)
        return {'post': contents }


# compilation rule
def render_post(env, template, **kwargs):
    """Render a template as a post."""
    post_template = env.get_template("_post.html")
    head, tail = os.path.split(template.name)
    post_title, _ = tail.split('.')
    if head:
        out = "%s/%s.html" % (head, post_title)
        if not os.path.exists(head):
            os.makedirs(head)
    else:
        out = "%s.html" % (post_title, )
    post_template.stream(**kwargs).dump(out)


if __name__ == "__main__":
    site = make_site(extensions=[
        Markdown2Extension,
    ], contexts=[
        ('.*.md', get_post_contents),
    ], rules=[
        ('.*.md', render_post),
    ])
    site.render(use_reloader=False)