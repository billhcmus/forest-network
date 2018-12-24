import React, {Component} from 'react';
import FollowerItem from './follower-item';
import '../css/follow.scss';

class FollowersList extends Component {

    componentWillMount(){
        this.props.updateListFollower(this.props.activeUser);
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('scrollfollower');
        if (this.isBottom(wrappedElement)) {
            if (this.props.list_follower.length > 0) {
                this.props.addListFollower(this.props.activeUser,this.props.list_follower.length)
            }
        }
    };

    render() {
        return (
            <div className="list-follow" id ="scrollfollower" ref={(el) => { this.screen = el; }}>
                {
                    this.props.list_follower.map((value, key)=>{
                        return <FollowerItem key={key} FollowItem={value}/>
                    })
                }
            </div>
        );
    }
}

export default FollowersList;
