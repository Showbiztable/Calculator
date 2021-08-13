import "./Calculator.css"
import React from "react"

import Button from "../components/Button"
import Display from "../components/Display"

const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    indexValues: 0
}

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...initialState }
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.indexValues === 0) {
            this.setState({
                operation,
                indexValues: 1,
                clearDisplay: true
            })
        } else {
            const equals = operation === "="
            const currentOperation = this.state.operation
            let values = [...this.state.values]

            console.log(currentOperation)
            console.log(values)

            // try {
            //     values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            // } catch (error) {
            //     values[0] = this.state.values[0]
            // }

            switch (currentOperation) {
                case "+":
                    values[0] = (values[0] + values[1])
                    console.log(values[0])
                    break;
                case "-":
                    values[0] = (values[0] - values[1])
                    break;
                case "/":
                    values[0] = (values[0] / values[1])
                    break;
                case "*":
                    values[0] = (values[0] * values[1])
                    break;
                default:
                    values[0] = this.state.values[0]
            }

            values[1] = 0

            console.log(values)

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                indexValues: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(number) {
        if (number !== "," || !this.state.displayValue.includes(",")) {
            const clearDisplay = this.state.displayValue === "0" || this.state.clearDisplay
            const currentValues = clearDisplay ? "" : this.state.displayValue
            const displayValue = currentValues + number
            this.setState({ displayValue, clearDisplay: false })

            const i = this.state.indexValues
            const newValue = parseFloat(displayValue.replace(",","."))
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.addDigit} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="," click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}

export default Calculator