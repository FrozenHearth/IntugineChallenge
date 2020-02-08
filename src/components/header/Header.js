import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IntugineIcon from '../../assets/images/logo.svg';
import ProfileIcon from '../../assets/images/profile.svg';
import { withStyles } from '@material-ui/core/styles';

// Using custom styles object, and withStyles HOC to add custom styles to Material UI

const styles = {
  profileCircle: {
    backgroundColor: '#bfc2c9',
    height: '50px',
    padding: '0.4em',
    borderRadius: '50%'
  },
  brandName: {
    marginLeft: '1em'
  },
  navLinkContainer: {
    margin: '0 0 0 auto'
  },
  homeBtn: {
    backgroundColor: '#f8f9ff',
    lineHeight: '4em'
  },
  navBar: {
    padding: '1em',
    backgroundColor: '#fefefe'
  }
};

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar className={classes.navBar} color="default">
          <Toolbar>
            <img src={IntugineIcon} alt="" />
            <Typography className={classes.brandName} variant="h6">
              Intugine
            </Typography>
            <div className={classes.navLinkContainer}>
              <Button className={classes.homeBtn}>Home</Button>
              <Button>Brands</Button>
              <Button>Transporters</Button>
              <Button className={classes.profileCircle}>
                <img src={ProfileIcon} alt="" />
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
