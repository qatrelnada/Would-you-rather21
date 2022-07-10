import React from 'react';
import { Redirect } from 'react-router-dom';
import { handleAddUser } from './../redux/thunks/users';
import { connect } from 'react-redux';

const readFileAsDataURL = (file) =>
  new Promise(resolve => {
    const reader = new FileReader()

    reader.onload = (event) => {
      resolve(event.target.result)
    }

    reader.readAsDataURL(file)
  })

const resizeImage = (imageURL, canvas, maxHeight) =>
  new Promise(resolve => {
    const image = new Image()

    image.onload = () => {
      const context = canvas.getContext('2d')

      if (image.height > maxHeight) {
        image.width *= maxHeight / image.height
        image.height = maxHeight
      }

      context.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = image.width
      canvas.height = image.height

      context.drawImage(image, 0, 0, image.width, image.height)

      resolve(canvas.toDataURL('image/jpeg'))
    }

    image.src = imageURL
  })

class SignUp extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        img: null,
        toHome: false
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { firstName, lastName, img } = this.state;
        
        // Add user to Store
        this.props.dispatch(handleAddUser(firstName, lastName, img))
    
        this.setState({
            firstName: '',
            lastName: '',
            img: null,
            toHome: true
        })
    }
    
    handleFileChange = (event) => {
        const file = event.target.files[0]

        if (file && file.type.match(/^image\//)) {
        readFileAsDataURL(file).then(originalURL => {
            resizeImage(originalURL, this.canvas, this.props.maxHeight).then(url => {
            this.setState({ img: url })
            })
        })
        } else {
        this.setState({ img: '' })
        }
    }

    handleFormReset = () => {
        this.setState({ img: '' })
    }

    componentDidMount() {
        this.canvas = document.createElement('canvas')
        this.fileInput.form.addEventListener('reset', this.handleFormReset)
    }

    // componentWillUnmount() {
    //     this.fileInput.form.removeEventListener('reset', this.handleFormReset)
    // }

    render() { 
        const { toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        const { img } = this.state

        const style = {
        position: 'relative'
        }

        if (img) {
        style.backgroundImage = `url("${img}")`
        style.backgroundRepeat = 'no-repeat'
        style.backgroundPosition = 'center'
        style.backgroundSize = 'cover'
        }

        return <div className='content'>
            <h1>Welcome</h1>
            <form onSubmit={this.handleSubmit}>
                <div className='create-contact-avatar-input' style={style}>
                    <input type="hidden" name='avatarURL' value={img} />
                    <input
                    ref={node => this.fileInput = node}
                    type="file"
                    onChange={this.handleFileChange}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0
                    }}
                    />
                </div>
                <input size='30' value={this.state.firstName} placeholder='First name' onChange={(e) => {
                        this.setState({firstName: e.target.value})
                    }} />
                <br />
                <input size='30' value={this.state.lastName} placeholder='Last name' onChange={(e) => {
                        this.setState({lastName: e.target.value})
                    }} />
                <br />
                <input type='submit' value='Create a new user' className='create-a-new-user-btn' />
            </form>
        </div>;
    }
}
 
export default connect()(SignUp);