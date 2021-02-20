import React from 'react';

const BLANK_FORM = {
  name: "",
  email: "",
  phone: "",
  message: ""
}

export default function() {
  const [contactForm, setContactForm] = React.useState(BLANK_FORM);
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setContactForm(prevState => ({ ...prevState, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactForm)
    })
    
    const data = await res.json()
    
    if (res.status === 200) {
      setContactForm(BLANK_FORM)
      setError("")
      setSuccess(data.msg)
    } else {
      setSuccess("")
      setError(data.msg)
    }
  }

    return (
        <>
        <div id="contact-form">
            <div id="success">{success}</div>
            <div id="error">{error}</div>
            <form onSubmit={handleSubmit} name="contactform">
                <input name="name" type="text" id="name" value={contactForm.name} onChange={handleChange} placeholder="Name" />
                <input name="email" type="email" id="email" value={contactForm.email} onChange={handleChange} placeholder="Email" />            
                <input type="text" name="phone" id="phone" value={contactForm.phone} onChange={handleChange} placeholder="Phone" /> 
                <textarea name="message" id="comments" value={contactForm.message} onChange={handleChange} placeholder="Message" />
                {/* <div className="verify-wrap">
                    <span className="verify-text"> How many gnomes were in the story about the "Snow-white" ?</span> 
                    <input name="verify" type="text" id="verify" onclick="this.select()" defaultValue={0} />
                </div>  */}
                <button type="submit" id="submit" data-top-bottom="transform: translateY(-50px);" data-bottom-top="transform: translateY(50px);"><span>Send Message </span></button>          										           											
            </form>
        </div>
        </>
    )
}