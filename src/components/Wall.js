import React, {Component} from 'react'
export default class Wall extends Component {
    render() {
        return (
            <div className={"main-content"}>
                <div className={"sidebar-left"}>
                    Left
                </div>
                <div className={"content"}>
                    Center
                </div>
                <div className={"sidebar-right"}>
                    Right
                </div>
            </div>
        );
    }
}