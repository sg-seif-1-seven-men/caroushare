class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      currentUser: "",
      message: ""
    };
  }

  // HandleChange & handleSubmit
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch("/sessions", {
      body: JSON.stringify(this.state),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(loggedInUser => {
        return loggedInUser.json();
      })
      .then(jsonedUser => {
        if (jsonedUser.message === null) {
          this.setState({
            message: "User cannot be found"
          });
        } else if (jsonedUser.message === false) {
          this.setState({
            message: "Wrong Password Bro!"
          });
        } else {
          console.log(jsonedUser);
          this.setState({
            currentUser: jsonedUser
          });
          console.log("Current User is: ", this.state.currentUser);
        }
      })
      .then(() => {
        this.props.userState(this.state.currentUser);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <React.Fragment>
        {/* <Navbar /> */}
        <div className="jumbo4 login-container">
          <div className="container card main" style={{ width: "30rem" }}>
            <img
              src="../img/login.jpg"
              className="card-img-top"
              alt="Caroushare log in"
            />

            <div className="card-body">
              <h1>Login</h1>
              <form onSubmit={this.handleSubmit} className="">
                <label htmlFor="username" className="labels">
                  Username{" "}
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="password" className="labels">
                  Password{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <p>{this.state.message}</p>
                <br />
                <input
                  className="btn btn-success"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
