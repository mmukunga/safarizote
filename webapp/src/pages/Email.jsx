import React from 'react';
import axios from 'axios';

const Email = () => {
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/email', {
            email: email,
            message: message
        }).then(response => {
            console.log(response)
        });
    }
    return (
        <div>
            <h1>Contact Us!</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="message">Message</label>
                <input
                    type="message"
                    name="message"
                    placeholder="Message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="message">Message</label>
                <Input
                  type="message"
                  className="form-control"
                  name="message"
                  value={message}
                  onChange={onChangeMessage}
                  validations={[required, vmessage]}
                />
              </div>
                <button type="submit">Send</button>  
            </form>
        </div>
    );
}

export default Email;