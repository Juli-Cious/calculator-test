def test_calculator_request_model():
    # Create a CalculatorRequest model
    request = CalculatorRequest(num1=1.0, num2=2.0)

    # Test the model's properties
    assert request.num1 == 1.0
    assert request.num2 == 2.0

def test_calculator_response_model():
    # Create a CalculatorResponse model
    response = CalculatorResponse(result=10.0, status="success")

    # Test the model's properties
    assert response.result == 10.0
    assert response.status == "success"
    assert response.status =="Error" # test the status validator

def test_calculator_request_dict(): # dict(exclude_none=True)
    # Create a CalculatorRequest model
    request = CalculatorRequest(num1=1.0, num2=2.0)

    # Convert the model to a dictionary and exclude None values
    request_dict = request.dict(exclude_none=True)

    # Test the dictionary's contents
    assert request_dict == {"num1": 1.0, "num2": 2.0}
