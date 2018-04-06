import React from 'react'
import httpClient from '../httpClient.js'


class NewBar extends React.Component {

	state = {
		barFields: {name: '', address: ''}
	}

	handleFormChange(evt) {
		this.setState({
			barFields: {
				...this.state.barFields,
				[evt.target.name]: evt.target.value
			}
		})
	}

	handleFormSubmit(evt) {
		evt.preventDefault()
		httpClient.createBar(this.state.barFields).then((serverResponse) => {
            this.props.history.push('/bars')
		})
	}

    render(){
        const { name, address } = this.state.barFields
        return(
            <div className='NewBar'>
            <div className='row'>
                <div className='column column-33 column-offset-33'>
                    <h1>Add New Bar</h1>
                    <form onChange={this.handleFormChange.bind(this)} onSubmit={this.handleFormSubmit.bind(this)}>
                        <input type="text" placeholder="Name" name="name" value={name} />
                        <input type="text" placeholder="Address" name="address" value={address} />
                        <button>Add Bar</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default NewBar