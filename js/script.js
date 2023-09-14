function Calculator() {
  this.state = {
    op_screen: document.getElementById("op_screen"),
    screen: document.getElementById("screen"),
    btns: document.getElementsByClassName("btn"),
    operation: 0, // 0 - +, 1 - -, 2 - *, 3 - /, 4 - %, 5 - SQRT
    currentNum: 0, // 0 - firstNum, 1 - secondNum
    firstNum: 0,
    secondNum: 0,
    isAddingPoint: 0, // 1 the next digit will be added with .
    maxDigits: 13,
    result: 0, // res of calculations
    onScreen: 0, // text on the screen
    isShowingResult: 0, // is at the result screen
    opScreen: "", // operation text
    isFloat: 0, // is current number float
  };
  this.setState = (state) => {
    this.state = { ...this.state, ...state };
  };
  this.init = () => {
    for (let btn of this.state.btns) {
      btn.addEventListener("click", () => {
        this.dispatch(btn.dataset.action);
      });
    }
  };
  this.dispatch = (action) => {
    switch (action) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addDigit(action);
        break;
      case "C/CE":
        this.setState({
          currentNum: 0,
          firstNum: 0,
          secondNum: 0,
          onScreen: 0,
          operation: 0,
          opScreen: "",
          isShowingResult: 0,
        });
        break;
      case "+/-":
        if (!this.state.isShowingResult) {
          if (this.state.currentNum) {
            this.setState({ onScreen: -this.state.secondNum, secondNum: -this.state.secondNum });
          } else {
            this.setState({ onScreen: -this.state.firstNum, firstNum: -this.state.firstNum });
          }
        } else {
          this.setState({
            firstNum: -this.state.result,
            result: -this.state.result,
            onScreen: parseFloat(-this.state.result.toFixed(5)),
          });
        }
        break;
      case ".":
        if (this.state.currentNum) {
          if (Number.isInteger(this.state.secondNum)) {
            this.setState({
              isAddingPoint: 1,
              onScreen: (this.state.onScreen += "."),
            });
          }
        } else {
          if (Number.isInteger(this.state.firstNum)) {
            this.setState({
              isAddingPoint: 1,
              onScreen: (this.state.onScreen += "."),
            });
          }
        }
        break;
      case "+":
        this.setState({
          operation: 0,
          opScreen: "+",
          currentNum: 1,
          secondNum: 0,
          isShowingResult: 0,
        });
        break;
      case "-":
        this.setState({
          operation: 1,
          opScreen: "-",
          currentNum: 1,
          secondNum: 0,
          isShowingResult: 0,
        });
        break;
      case "*":
        this.setState({
          operation: 2,
          opScreen: "*",
          currentNum: 1,
          secondNum: 0,
          isShowingResult: 0,
        });
        break;
      case "÷":
        this.setState({
          operation: 3,
          opScreen: "÷",
          currentNum: 1,
          secondNum: 0,
          isShowingResult: 0,
        });
        break;
      case "%":
        this.setState({
          operation: 4,
          opScreen: "%",
          currentNum: 1,
          secondNum: 0,
          isShowingResult: 0,
        });
        break;
      case "SQRT":
        this.setState({
          prevOperation: this.state.operation,
          operation: 5,
        });
        this.calculate();
        break;
      case "=":
        this.setState({
          opScreen: "",
        });
        this.calculate();
    }
    this.render();
  };
  this.calculate = () => {
    let result;
    switch (this.state.operation) {
      case 0:
        this.setState({ isShowingResult: 1 });
        result = this.state.firstNum + this.state.secondNum;
        this.setState({
          result,
          firstNum: result,
        });
        break;
      case 1:
        result = this.state.firstNum - this.state.secondNum;
        this.setState({ isShowingResult: 1 });
        this.setState({
          result,
          firstNum: result,
        });
        break;
      case 2:
        result = this.state.firstNum * this.state.secondNum;
        this.setState({ isShowingResult: 1 });
        this.setState({
          result,
          firstNum: result,
        });
        break;
      case 3:
        result = this.state.firstNum / this.state.secondNum;
        this.setState({ isShowingResult: 1 });
        this.setState({
          result,
          firstNum: result,
        });
        break;
      case 4:
        result = this.state.firstNum % this.state.secondNum;
        this.setState({ isShowingResult: 1 });
        this.setState({
          result,
          firstNum: result,
        });
        break;
      case 5:
        if (!this.state.isShowingResult) {
          if (this.state.currentNum) {
            result = Math.sqrt(this.state.secondNum);
            this.setState({
              secondNum: result,
              onScreen: parseFloat(result.toFixed(5)),
            });
          } else {
            result = Math.sqrt(this.state.firstNum);
            this.setState({
              firstNum: result,
              onScreen: parseFloat(result.toFixed(5)),
            });
          }
        } else {
          result = Math.sqrt(this.state.firstNum);
          this.setState({
            result,
            onScreen: parseFloat(result.toFixed(5)),
            firstNum: result,
          });
        }
        this.setState({
          operation: this.state.prevOperation,
          isShowingResult: 1,
        });
        return;
    }
    this.setState({
      onScreen: parseFloat(this.state.result.toFixed(5)),
    });
  };
  this.addDigit = (digit) => {
    if (this.state.isShowingResult) {
      this.setState({
        currentNum: 0,
        firstNum: 0,
        secondNum: 0,
        isShowingResult: 0,
      });
    }
    if (String(this.state.currentNum ? this.state.secondNum : this.state.firstNum).length < 13) {
      let num = String(this.state.currentNum ? this.state.secondNum : this.state.firstNum);
      if (this.state.isAddingPoint) {
        num += "." + digit;
        this.setState({ isAddingPoint: 0 });
      } else {
        num += digit;
      }
      if (this.state.currentNum) {
        this.setState({
          secondNum: +num,
          onScreen: +num,
        });
      } else {
        this.setState({
          firstNum: +num,
          onScreen: +num,
        });
      }
    }
  };
  this.render = () => {
    if (this.state.onScreen == Infinity) {
      this.setState({
        onScreen: "∞",
      });
    }
    this.state.op_screen.innerText = this.state.opScreen;
    this.state.screen.innerText = this.state.onScreen;
    console.clear();
    console.log(this);
  };
}

let calc = new Calculator();
calc.init();
calc.render();
