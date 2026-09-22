from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent


class SPAHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_error(self, code, message=None, explain=None):
        # Match Netlify's /* -> /index.html rewrite for client-side routes.
        if code == 404 and self.path.split("?", 1)[0].rsplit("/", 1)[-1].find(".") == -1:
            self.path = "/index.html"
            return self.do_GET()
        super().send_error(code, message, explain)


if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", 3000), SPAHandler).serve_forever()
