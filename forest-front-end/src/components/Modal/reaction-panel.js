import React, {Component} from 'react';
import {Icon} from 'react-icons-kit';
import {thumbsOUp} from 'react-icons-kit/fa';
import '../../css/facebook-reaction.scss'
import {Keypair} from "stellar-base";
import {encodeReact} from "../../transaction/myv1";
import {encode, sign} from "../../transaction";
import _ from "lodash";
import WebService from "../../webservice";

class ReactionPanel extends Component {

    constructor(props) {
        super(props);
        this.service = new WebService();
        this.state = {
            isHover:false
        };
    }

    handleHoverIn =()=>{
        this.setState({isHover: true});
    }

    handleHoverOut =()=>{
        this.setState({isHover: false});
    }

    sendInteract = (type,isTurnOn) => {
        let secret = localStorage.getItem("SECRET_KEY");
        this.service.get(`api/sequence/?id=${
            Keypair.fromSecret(secret).publicKey()}`
        ).then(seq =>{
            let tx = {
                version: 1,
                account: '',
                sequence: seq.data + 1,
                memo: Buffer.alloc(0),
                operation: 'interact',
                params: {
                    object:this.props.itemInfo._id,
                    content : encodeReact({
                        type: 2,
                        reaction: isTurnOn ? type : 0,
                    }),
                }
            }
            sign(tx,secret);
            let data_encoding = '0x' + encode(tx).toString('hex');
            this.service.post(`api/users/sendTx`,{tx: data_encoding}).then((response) => {
                alert('Successs');
            }).catch(err => {
                const message = _.get(err, 'response.data.error.message', "React Unsuccess!");
                alert(message);
            })
        })
    }

    handleReactClick = (e,type) =>{
        e.stopPropagation()
        if (this.props.itemInfo.currentReaction === type){
            this.sendInteract(type,false)
        }
        else
            this.sendInteract(type,true)
    }


    render(){
        let className = "reaction-icon"
        if (this.state.isHover)
        {
            className = "reaction-icon show"
        }
        return(
            <div className="react-btn" onMouseLeave={()=>{this.handleHoverOut()}} onMouseEnter={()=>{this.handleHoverIn()}}>
                <span><Icon icon={thumbsOUp}/>React</span>
                <div className="reaction-box" style={this.state.isHover?{display:"block"}:{display:"none"}}>
                    <div className={className + " like"}  onClick={(e)=>{this.handleReactClick(e,1)}}>
                        <label>Like</label>
                    </div>
                    <div className={className + " love"}  onClick={(e)=>{this.handleReactClick(e,2)}}>
                        <label>Love</label>
                    </div>
                    <div className={className + " haha"}  onClick={(e)=>{this.handleReactClick(e,3)}}>
                        <label>Haha</label>
                    </div>
                    <div className={className + " wow"}  onClick={(e)=>{this.handleReactClick(e,4)}}>
                        <label>Wow</label>
                    </div>
                    <div className={className + " sad"}  onClick={(e)=>{this.handleReactClick(e,5)}}>
                        <label>Sad</label>
                    </div>
                    <div className={className + " angry"}  onClick={(e)=>{this.handleReactClick(e,6)}}>
                        <label>Angry</label>
                    </div>
                </div>
            </div>
    )}
}
export default ReactionPanel;
