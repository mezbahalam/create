
  var Shirt = React.createClass({
    getInitialState: function(){
      return{pixelsFromTop:145,inchesFromTop:2.5}
    },
    handleButtonClick: function(e){
      e.preventDefault();
      this.props.onButtonCLick();
    },
    handleUpClick: function(e){
      e.preventDefault();
      if(this.state.inchesFromTop > 0.6){
        var newInches = (parseFloat(this.state.inchesFromTop)-0.5).toFixed(1)
        this.setState({pixelsFromTop:this.state.pixelsFromTop-10,inchesFromTop:newInches})
        this.props.onInchesChange(newInches)
      }
    },
    handleDownClick: function(e){
      e.preventDefault();
      if(this.state.inchesFromTop < 4.6){
        var newInches = (parseFloat(this.state.inchesFromTop)+0.5).toFixed(1)
        this.setState({pixelsFromTop:this.state.pixelsFromTop+10,inchesFromTop:newInches})
        this.props.onInchesChange(newInches)
      }
    },
    handleColorClick: function(e){
      e.preventDefault()
      this.props.onColorChange(e.target.value)
    },
    render: function(){
      var className = "shirt color-"+this.props.color
      var buttonClass
      if(this.props.valid == false){
        buttonClass = "invalid"
      }

      if (this.props.shirtState == "button"){
        return(
          <div className={className}>
              <button className={"upload-butt "+buttonClass} onClick={this.handleButtonClick}>+</button>
            <div className="buttons">
              <button className="color color-white" onClick={this.handleColorClick} value="white"></button>
              <button className="color color-black" onClick={this.handleColorClick} value="black"></button>
              <button className="color color-blue" onClick={this.handleColorClick} value="blue"></button>
              <button className="color color-green" onClick={this.handleColorClick} value="green"></button>
              <button className="color color-orange" onClick={this.handleColorClick} value="orange"></button>
              <button className="color color-pink" onClick={this.handleColorClick} value="pink"></button>
              <button className="color color-purple" onClick={this.handleColorClick} value="purple"></button>
              <button className="color color-red" onClick={this.handleColorClick} value="red"></button>
              <button className="color color-yellow" onClick={this.handleColorClick} value="yellow"></button>
            </div>
          </div>
        )
      }
      else{
        return(
          <div className={className}>
            <div className="canvas" style={{paddingTop:this.state.pixelsFromTop}}>
              <img src={this.props.image} />
            </div>
            <div className="positioner">
              <button onClick={this.handleUpClick}><i className="fa fa-sort-asc"></i></button>
              <div className="inches"> {this.state.inchesFromTop+'"'}</div>
              <button onClick={this.handleDownClick}><i className="fa fa-sort-desc"></i></button>
            </div>
            <div className="buttons after-upload">
              <button className="color color-white" onClick={this.handleColorClick} value="white"></button>
              <button className="color color-black" onClick={this.handleColorClick} value="black"></button>
              <button className="color color-blue" onClick={this.handleColorClick} value="blue"></button>
              <button className="color color-green" onClick={this.handleColorClick} value="green"></button>
              <button className="color color-orange" onClick={this.handleColorClick} value="orange"></button>
              <button className="color color-pink" onClick={this.handleColorClick} value="pink"></button>
              <button className="color color-purple" onClick={this.handleColorClick} value="purple"></button>
              <button className="color color-red" onClick={this.handleColorClick} value="red"></button>
              <button className="color color-yellow" onClick={this.handleColorClick} value="yellow"></button>
            </div>
          </div>
        )
      }
    }
  })

  var Form = React.createClass({
    getInitialState: function(){
      return {shirtState:'button',
      image:null,
      inches:2.5,
      color:'white',
      shirtName:'',
      bandName:'',
      bandcampUrl:'',
      email:'',
      fullName:'',
      ccNumber:'',
      month:'',
      year:'',
      cvc:'',
      cc:'',
      paypal:'',
      stripeToken:null,
      numberValid:null,
      cvcValid:null,
      yearValid:null,
      cardType:null}
    },
    handleButtonClick: function(){
      var upload = React.findDOMNode(this.refs.file).click();

    },
    handleFileChange: function(){
      var oFReader = new FileReader();
      var form = this;
      oFReader.readAsDataURL(React.findDOMNode(this.refs.file).files[0]);
      oFReader.onload = function (oFREvent) {
        form.setState({shirtState:'uploaded',image:oFREvent.target.result})
      };
    },
    handleInchesChange: function(inches){
      this.setState({inches:inches})
    },
    handleColorChange: function(color){
      this.setState({color:color})
    },
    handleClickPP: function(e){
      if ($("#paypal").is(":checked")) {
        $("#cc").prop({ disabled: true, checked: false });
        $("#email").attr("placeholder", "Paypal Email");
        $("#ccn").attr("disabled", true)
        $("#cvc").attr("disabled", true)
        $("#ccn").hide();
        $(".eighty").hide();
        $('#paypal-caption-info').show();
      } else {
        $("#email").attr("placeholder", "Email");
        $("#cc").prop("disabled", false);
        $("#ccn").attr("disabled", false)
        $("#cvc").attr("disabled", false)
        $("#ccn").show();
        $(".eighty").show();
        $('#paypal-caption-info').hide();
      }
    },
    handleClickCC: function(e){
      if ($("#cc").is(":checked")) {
        $("#paypal").prop({ disabled: true, checked: false });
        $("#cc  ").val();
      } else {
        $("#paypal").prop("disabled", false);
      }
    },
    handleSubmit: function(e){
      e.preventDefault();
      var regx_email = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
      var regx_url =  /^[a-zA-Z0-9-_s]*$/;
      var regx_title =  /^[a-zA-Z0-9 _-_s]*$/;
      if($("#ccn").prop("disabled")
        && $("#cvc").prop("disabled")
        && this.state.bandName != ''
        && this.state.bandcampUrl != ''
        && this.state.email != ''
        && this.state.fullName != ''
        && this.state.shirtName != ''
        && this.state.image != null
        && regx_title.test(this.state.shirtName)
        && regx_email.test(this.state.email)
        && regx_url.test(this.state.bandcampUrl)){
        React.findDOMNode(this.refs.form).submit();
      }else if(this.state.numberValid
        && this.state.cvcValid
        && this.state.yearValid
        && this.state.bandName != ''
        && this.state.bandcampUrl != ''
        && this.state.email != ''
        && this.state.fullName != ''
        && this.state.shirtName != ''
        && this.state.image != null
        && regx_title.test(this.state.shirtName)
        && regx_email.test(this.state.email)
        && regx_url.test(this.state.bandcampUrl)){
        this.props.onSubmit(true);
        Stripe.card.createToken({
          number: React.findDOMNode(this.refs.cc_number).value.trim(),
          cvc: React.findDOMNode(this.refs.cvc).value.trim(),
          exp_month: React.findDOMNode(this.refs.month).value.trim(),
          exp_year: React.findDOMNode(this.refs.year).value.trim(),
        }, this.stripeResponseHandler);
      }
      else{
        if (this.state.numberValid == null){
          this.setState({numberValid:false})
        }
        if (this.state.cvcValid == null){
          this.setState({cvcValid:false})
        }
        if (this.state.yearValid == null){
          this.setState({yearValid:false})
        }
        if( this.state.bandName == ''){
          this.setState({bandNameValid:false})
        }
        if( this.state.bandcampUrl == ''){
          this.setState({bandUrlValid:false})
        }
        if( !regx_url.test(this.state.bandcampUrl)){
          this.setState({bandUrlValid:false})
        }
        if( this.state.email == ''){
          this.setState({emailValid:false})
        }
        if(!regx_email.test(this.state.email)){
          this.setState({emailValid:false})
        }
        if( this.state.fullName == ''){
          this.setState({fullNameValid:false})
        }
        if( this.state.shirtName == ''){
          this.setState({shirtNameValid:false})
        }
        if(!regx_title.test(this.state.shirtName)){
          this.setState({shirtNameValid:false})
        }
        if( this.state.image == null){
          this.setState({imageValid:false})
        }
      }

    },
    stripeResponseHandler: function(status, response){
        // var $form = $('#payment-form');
      console.log("stripe response handling")
      if (response.error) {
        // Show the errors on the form
        alert(response.error.message)
        this.props.onSubmit(false);

        // $form.find('.payment-errors').text(response.error.message);
        // $form.find('button').prop('disabled', false);
      } else {
        var token = response.id;
        this.setState({stripeToken:token})
        // $form.get(0).submit();
        React.findDOMNode(this.refs.form).submit();

      }
    },
    validateCard: function(){

      this.setState({numberValid:Stripe.card.validateCardNumber(React.findDOMNode(this.refs.cc_number).value.trim()),
                  cardType:Stripe.card.cardType(React.findDOMNode(this.refs.cc_number).value.trim())})
    },
    validateCVC: function(){
      this.setState({cvcValid:Stripe.card.validateCVC(React.findDOMNode(this.refs.cvc).value.trim())})
    },
    validateYear: function(){
      if(React.findDOMNode(this.refs.month).value.trim().length > 1 && React.findDOMNode(this.refs.year).value.trim().length > 1){
        this.setState({yearValid:Stripe.card.validateExpiry(React.findDOMNode(this.refs.month).value.trim(),React.findDOMNode(this.refs.year).value.trim())})
      }
    },
    handleTyping: function(e){
      var value = e.target.value
      if(e.target.id == "name"){
        this.setState({bandName:value,bandNameValid:true})
      }
      else if (e.target.id == "url"){
        this.setState({bandcampUrl:value,bandUrlValid:true})
      }
      else if (e.target.id == "email"){
        this.setState({email:value,emailValid:true})
      }
      else if (e.target.id == "fullName"){
        this.setState({fullName:value,fullNameValid:true})
      }
      else if (e.target.id == "shirtName"){
        this.setState({shirtName:value,shirtNameValid:true})
      }
      else if (e.target.id == "ccn"){
        if (isNaN(value.replace(/ /g,'')) )
          return false;
        if (value.replace(/ /g,'').length < 17){
          this.setState({ccNumber:value})
        }
      }
      else if(e.target.id == "paypal"){
        if($("#payment").is(":checked")){
          this.setState({ccNumber:value, numberValid:true})
          this.setState({year:value, yearValid:true})
          this.setState({cvc:value,  cvcValid:true})
          $('.card-type').hide();
        }else{
          this.setState({ccNumber:value, numberValid:false})
          this.setState({year:value, yearValid:false})
          this.setState({cvc:value,  cvcValid:false})
          $('.card-type').show();
        }
      }
      else if (e.target.id == "month"){
        if (isNaN(value) )
          return false;
        if (value.length > 2)
          return false
        this.setState({month:value})
      }
      else if (e.target.id == "year"){
        if (isNaN(value) )
          return false;
        if (value.length > 2)
          return false
        this.setState({year:value})
      }
      else if (e.target.id == "cvc"){
        if (isNaN(value) )
          return false;
        if (value.length > 3)
          return false
        this.setState({cvc:value})
      }

    },
    render: function(){
      var state = this.state
      var numberClass='';
      var cvcClass='';
      var yearClass='';
      var bandNameClass='';
      var bandUrlClass='';
      var emailClass='';
      var fullNameClass='';
      var cardDiv;
      var shirtNameClass='';
      var divStyle = {display: "none"};
      var divStyleEmail = {display: "none"};
      if(state.numberValid == false){
        numberClass = "invalid"
      }
      if(state.cvcValid == false){
        cvcClass = "invalid"
      }
      if(state.yearValid == false){
        yearClass = "invalid"
      }
      if(state.bandNameValid == false){
        bandNameClass = "invalid"
      }
      if(state.bandUrlValid == false){
        bandUrlClass = "invalid"
        $(".invalid-text-url").show()
      }else{
        $(".invalid-text-url").hide();
      }
      if(state.emailValid == false){
        emailClass = "invalid"
      }
      if(state.fullNameValid == false){
        fullNameClass = "invalid"
      }
      if(state.shirtNameValid == false){
        shirtNameClass = "invalid"
        $(".invalid-text-title").show()
      }else{
        $(".invalid-text-title").hide();
      }

      if(state.numberValid == false){
        numberClass = "invalid"
      }
      if(state.cvcValid == false){
        cvcClass = "invalid"
      }
      if(state.yearValid == false){
        yearClass = "invalid"
      }

      if(state.numberValid == true){
        numberClass = "valid"
      }
      if(state.cvcValid == true){
        cvcClass = "valid"
      }
      if(state.yearValid == true){
        yearClass = "valid"
      }


      if(this.state.cardType && (this.state.cardType != "unknown")){
        cardDiv = <div className="card-type">{this.state.cardType}</div>
      }

      return(
        <form onSubmit={this.handleSubmit} acceptCharset="UTF-8" method="post" encType="multipart/form-data" action="/uploads" ref="form">
          <div className="half">
            <Shirt
              onButtonCLick={this.handleButtonClick}
              shirtState={this.state.shirtState}
              image={this.state.image}
              onInchesChange={this.handleInchesChange}
              onColorChange={this.handleColorChange}
              color={this.state.color}
              valid={this.state.imageValid}/>
          </div>
          <div className="half second">
            <input type="file" name="image" className="shirt-file" ref="file" onChange={this.handleFileChange} />
            <input type="hidden" name="inches" value={this.state.inches}/>
            <input type="hidden" name="color" value={this.state.color}/>
            <input type="hidden" name="stripeToken" value={this.state.stripeToken} />
            <input type="text" className={shirtNameClass} name="shirt_name" placeholder="T-Shirt Title" onChange={this.handleTyping} ref="shirtName" id="shirtName" value={this.state.shirtName}/>
            <div className="invalid-text-title" style={divStyle}><sup>Only letters, numbers, dashes & spaces</sup></div>
            <input type="text" className={bandNameClass} name="band_name" placeholder="Artist / Band Name" onChange={this.handleTyping} ref="name" id="name" value={this.state.bandName}/>
            <input type="text" className={bandUrlClass+" halfplus-input"} name="bancamp_url" placeholder="Bandcamp URL" onChange={this.handleTyping} id="url" value={this.state.bandcampUrl} /> <span className="bigg">.bandcamp.com</span>
            <div className="invalid-text-url" style={divStyle}><sup>Only letters, numbers & dashes. No https://</sup></div>
            <div>
              <ul className="payment-method">
                <li className="control-inline"><label className="payment-header">Payment Method</label></li>
                <li className="label-controll-inline control-inline">
                  <input className="payment-selection" onClick= { this.handleClickCC } id="cc" type="checkbox" name="cc" /><label for="credit card">Creadit Card</label>
                </li>
                <li className="control-inline">
                  <input className="payment-selection" onChange={this.handleTyping} onClick= { this.handleClickPP } id="paypal" type="checkbox" name="paypal" /><label for="paypal">Paypal</label>
                </li>
              </ul>
            </div>
            <input type="text" className={emailClass} name="email" placeholder="Email" onChange={this.handleTyping} id="email" value={this.state.email} />
            <input type="text"  className={fullNameClass} name="full_name" placeholder="Full Name" ref="full_name" value={this.state.fullName}  id="fullName" onChange={this.handleTyping}/>
            <div id="paypal-caption-info" className="caption-info" style={divStyle}>
              <p>When you sell a shirt on Bandcamp, you will receive a PayPal invoice from us. This must be paid in order for us to process the order.</p></div>
            <input type="text" placeholder="Credit Card Number" ref="cc_number" className={numberClass} onBlur={this.validateCard} id="ccn" value={this.state.ccNumber} onChange={this.handleTyping}/>
            {cardDiv}
            <div className="eighty">
              <input placeholder="MM" ref="month" className={"quarter-input "+yearClass} onBlur={this.validateYear} id="month" value={this.state.month} onChange={this.handleTyping}/>
              <input placeholder="YY" ref="year" className={"quarter-input "+yearClass} onBlur={this.validateYear} id="year" value={this.state.year} onChange={this.handleTyping}/>
              <input placeholder="CVC" ref="cvc" className={"half-input "+cvcClass} onBlur={this.validateCVC} id="cvc" value={this.state.cvc} onChange={this.handleTyping}/>
            </div>
            <input type="submit" value="Submit"/>
            <div className="caption-info"><p>You will only be charged when a fan buys your shirt on Bandcamp.
                By clicking Submit, you confirm that you have read and agree with our <a target="_blank" href="http://tonethreads.com/terms">Terms of Service</a>.
            </p></div>
          </div>
        </form>
      )
    }
  })

  var FormWrapper = React.createClass({
    getInitialState: function(){
      return {submitting:false}
    },
    handleSubmit: function(state){
      this.setState({submitting:true})
    },
    render: function(){
      var loader;
      if (this.state.submitting){
        loader = <div className="loader">
          <img alt="Loading" className="loader-image" src="https://tonethreads.com/images/loading-d0df7f4e35df4273f32a597238bb9678.gif" />
          <div className="on-call-loader-text">loading
          </div>
        </div>
      }
      return(
        <div className="form">
          <Form onSubmit={this.handleSubmit}/>
          {loader}
        </div>
      )
    }
  })

  $(document).ready(function(){
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'))
    React.render(<FormWrapper />,document.getElementById('container'));
    $("#cc").prop({ disabled: false, checked: true });
  })
