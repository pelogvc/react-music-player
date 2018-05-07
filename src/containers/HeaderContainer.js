import React from 'react';
import Header from 'components/Header/Header';

class HeaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleSubmit = (e) => {
        this.props.history.push('/search/' + this.state.value);
        if ( this.state.value )
            this.props.history.push('/search/' + this.state.value);
        else
            this.props.history.push('/');

        e.preventDefault();
    }
    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    handleCancel = (e) => {
        this.setState({
            value: '',
        })
        this.props.history.push('/');
        
    }

    render() {
        return (
            <div>
                <Header onSubmit={this.handleSubmit} onChange={this.handleChange} value={this.state.value} onCancel={this.handleCancel} />
            </div>
        )
    }
}

export default HeaderContainer;