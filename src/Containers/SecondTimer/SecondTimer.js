import React, { Component } from 'react';
import './SecondTimer.css';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class SecondTimer extends Component {
    constructor(props) {
        super(props);

        this.state = { minutes: 0, seconds: 0, miliseconds: 0, btn1: false, btn2: true, btn3: true, timesList: [] }
    }

    renderTime = (time) => {
        return time < 10 ? "0" + time : time
    }

    start = () => {
        this.t = setInterval(() => {
            this.setState((state) => {
                return { miliseconds: state.miliseconds + 1 };
            })
        }, 100)
        this.setState((state) => { return { btn1: true, btn2: false } });
    }

    pause = () => {
        clearInterval(this.t);
        this.setState((state) => { return { btn2: true, btn3: false } });
    }

    clear = () => {
        this.setState((state) => { return { minutes: 0, seconds: 0, miliseconds: 0, btn1: false, btn3: true, timesList: [] } });
    }

    continue = () => {
        this.t = setInterval(() => {
            this.setState((state) => {
                return { miliseconds: state.miliseconds + 1 };
            })
        }, 100)
        this.setState((state) => { return { btn2: false, btn3: true } });
    }

    split = () => {
        this.setState((state) => {
            let list = [...state.timesList];
            let a = this.renderTime(state.minutes) + ":" + this.renderTime(state.seconds) + ":" + this.renderTime(state.miliseconds);
            list.push(a);
            return { timesList: list }
        });
    }

    componentDidUpdate() {
        if (this.state.miliseconds > 9) {
            this.setState((state) => { return { miliseconds: 0, seconds: state.seconds + 1 } });
        }
        if (this.state.seconds > 59) {
            this.setState((state) => { return { seconds: 0, minutes: state.minutes + 1 } });
        }
        if (this.state.minutes > 59) {
            this.setState((state) => { return { minutes: 0 } });
        }
    }

    componentWillUnmount() {
        clearInterval(this.t);
    }

    render() {
        return (
            <div>
                <div className="display bg-dark pt-5">
                    <h1 className="minutes text-white">{this.renderTime(this.state.minutes)}</h1>
                    <h1 className="dots text-white">:</h1>
                    <h1 className="seconds text-white">{this.renderTime(this.state.seconds)}</h1>
                    <h1 className="dots2 text-white">:</h1>
                    <h1 className="miliseconds text-white">{this.renderTime(this.state.miliseconds)}</h1>
                    <div className="pt-5">
                        <button className={`btn btn-success mt-3 me-3 ${this.state.btn1 && 'd-none' || ''}`} onClick={this.start}>Start</button>
                        <button className={`btn btn-primary mt-3 me-3 ${this.state.btn2 && 'd-none' || ''}`} onClick={this.split}>Split</button>
                        <button className={`btn btn-primary mt-3 me-3 ${this.state.btn2 && 'd-none' || ''}`} onClick={this.pause}>Pause</button>
                        <button className={`btn btn-danger mt-3 me-3 ${this.state.btn3 && 'd-none' || ''}`} onClick={this.clear}>Clear</button>
                        <button className={`btn btn-danger mt-3 me-3 ${this.state.btn3 && 'd-none' || ''}`} onClick={this.continue}>Continue</button>
                    </div>
                </div>
                <ListGroup className="text-start mt-3">
                    {
                        this.state.timesList.map((value, index) => {
                            return <ListGroupItem className="border-0 border-bottom px-5" key={index}>#{index + 1} {value}</ListGroupItem>
                        })
                    }
                </ListGroup>
            </div>
        )
    }
}
