from unittest import TestCase
from function_app import list
import azure.functions as func


app = func.FunctionApp()
app.register_functions(list)


class TestListFunctions(TestCase):

    def test_list(self):
        # Arrange
        req = func.HttpRequest(
            method="GET",
            body=None,
            url="/list",
            params={}
        )

        # Act
        func_call = list.build().get_user_function()
        response = func_call(req)

        # Assert
        assert response.status_code == 200
        assert response.mimetype == 'application/json'
        assert isinstance(response.body, dict)
