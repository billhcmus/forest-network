import {Modal} from 'antd';
import React, {Component} from 'react';
import '../../css/history.scss';


class DetailTransaction extends Component {

    render() {
        const transaction = this.props.transaction;
        let memo = ''
        if (transaction)
            memo = new Buffer(transaction.tx.memo,'base64')
        return (
            <Modal
                title="Transaction detail"
                visible={this.props.isModalShow}
                onCancel={() => this.props.onCancel()}
                footer={null}
                style={{top:20}}
                width = {700}
                bodyStyle={{padding:0}}
            >
                { transaction !== ''
                    ? <div className="container">
                        <h5>
                           <a target="_blank" href={`https://forest.network/transactions/${transaction._id}`}>
                               {transaction._id}
                           </a>
                        </h5>
                        <h5>Comfirmed at block 
                            <a target="_blank" href={`https://forest.network/blocks/${transaction.block}`}>
                                {transaction.block}
                            </a>
                        </h5>
                        <article style={{backgroundColor:"aquamarine",height:'25px'}}>
                            <h5>Successful</h5>
                        </article>
                        <div className="columns">
                            <div className="column">
                                <h5><strong>Operation</strong>: {transaction.operation}</h5>
                                <h5>
                                    <strong>Memo</strong>: {memo !== '' ? memo.toString()  : ''}
                                </h5>
                                <h5><strong>Tags</strong>: {transaction.tags.length}</h5>
                            </div>
                        </div>
                        <div className="b-table">
                            <div className="table-wrapper">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th className="">
                                            <div className="th-wrap">Key
                                            </div>
                                        </th>
                                        <th className="">
                                            <div className="th-wrap">value</div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        transaction.tags.map((value, key) => {
                                            return (
                                                <tr key={key} className="">
                                                    <td data-label="Key" className="">
                                                        <span>{value.key}</span>
                                                    </td>
                                                    <td data-label="value" className="clickable">
                                                        <span onClick={(e) => {
                                                            e.stopPropagation()
                                                            if (this.props.activeUser !== value.value)
                                                                window.location =`/${value.value}`
                                                        }}>{value.value}</span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <pre style={{backgroundColor: 'beige',textAlign:"left"}}>{JSON.stringify(transaction.tx, null, 4)}</pre>
                    </div>

                    :<div></div>
                }
            </Modal>
        );
    }
}
export default DetailTransaction;