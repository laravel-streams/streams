from locust import HttpUser, task

class NewVisitor(HttpUser):

    def on_start(self):
        self.client.headers = {'User-Agent': 'locust'}

    @task(1)
    def home_page(self):
        self.client.get("/")
