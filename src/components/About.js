import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import { useSpring, animated } from 'react-spring';
import Typography from "@material-ui/core/Typography";
import Zoom from '@material-ui/core/Zoom';
import FadeIn from "react-fade-in";
import {NavLink} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import {aboutMe} from '../constants';
import Tooltip from "@material-ui/core/Tooltip";

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const useStyles = makeStyles((theme)=>({
    container:{
        width:'100%',
        minHeight: "90vh",
        paddingTop:'10vh',
        alignContent: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: 'linear-gradient(to right, #ada996, #f2f2f2, #dbdbdb, #eaeaea)'
    },
    wrapper:{
        display: "flex",
        overflow: "visible",
        flexDirection: "row",
        padding: '5vmin',
        justifyContent: "center",
        flexWrap: "wrap",
        alignSelf: "center",
        paddingBottom:'0vw',
    },
    profile:{
        minWidth:'350px',
        minHeight: '350px',
    },
    description:{
        textAlign: "center",
        padding:'4vw',
        maxWidth: '40rem',
    },
    text:{
        fontFamily:'Lato',
        fontWeight: 20
    },
    heading:{
        fontFamily : 'Raleway',
        fontWeight: "bold",
        fontSize: 50,
        color: '#f46524',
    },
    fab: {
        width:'30vw',
        display: "flex",
        flexDirection: "row",
        alignSelf: "center" ,
        justifyContent: "space-between",
        padding: '.5rem'
    },
}))

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}

function About() {
    const classes=useStyles();
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 150, friction: 5 } }))
    return(
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Zoom in={true} style={{transitionDelay:'1000ms'}}>
                    <div className={classes.profile}>
                        <animated.div
                            className="card"
                            onMouseMove={({clientX: x, clientY: y}) => set({xys: calc(x, y)})}
                            onMouseLeave={() => set({xys: [0, 0, 1]})}
                            style={{transform: props.xys.interpolate(trans)}}
                        />
                    </div>
                </Zoom>

                <FadeIn
                    delay={500}
                    transitionDuration={800}
                    className={classes.description}
                >
                    <Typography
                        align='left'
                        variant='h3'
                        className={classes.heading}
                    >
                        About Me
                    </Typography>
                    {aboutMe.map((text)=>(
                        <Typography
                            align='left'
                            variant='body1'
                            className={classes.text}
                        >
                            {text}
                        </Typography>
                    ))}
                    <Typography
                        align='left'
                        variant='body1'
                        className={classes.text}
                    >
                        Reach me at <a href={'mailto:iam@ibit98.tech'}>iam@ibit98.tech</a>
                    </Typography>
                </FadeIn>
            </div>
            <div className={classes.fab}>
                <div>
                    <BootstrapTooltip title={'Home'}>
                        <NavLink to={'/'}>
                            <Fab
                                size="medium"
                                color="secondary"
                                aria-label="add"
                            >
                                <ArrowBackIosRoundedIcon/>
                            </Fab>
                        </NavLink>
                    </BootstrapTooltip>

                </div>
                <div>
                    <BootstrapTooltip title='Skills'>
                        <NavLink to={'/skills'}>
                            <Fab
                                size="medium"
                                color="secondary"
                                aria-label="add"
                            >
                                <ArrowForwardIosRoundedIcon/>
                            </Fab>
                        </NavLink>
                    </BootstrapTooltip>
                </div>
            </div>
        </div>
    )
}

export default About;