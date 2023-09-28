import React, { forwardRef } from 'react'
import '../App.css';
import './PlayerControls.css';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import FullScreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';


//label for elapsed time
function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

//seekbar/slider
const PrettoSlider = withStyles({
    root: {
        color: "#4ed451",
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -8,
        marginLeft: -12,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
        },
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)",
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

const CustomSlider = withStyles({
    root: {
        color: "#4ed451",
        height: 3,
        padding: "13px 0",
    },
    track: {
        height: 3,
        borderRadius: 50,
    },
    thumb: {
        height: 10,
        width: 10,
        backgroundColor: "#fff",
        marginTop: -4,
        marginLeft: -4,
        color: "#fff",
    },
})(Slider);

//export references to room class
export default forwardRef(({
    onPlayPause,
    onRewind,
    onFastForward,
    muted,
    onMute,
    onVolumeChange,
    onVolumeSeekDown,
    volume,
    onToggleFullScreen,
    fullscreen,
    played,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    elapsedTime,
    totalDuration,
    videoStatus,
}, ref) => {

    return (
        <div id='controls-wrapper' ref={ref}>
            <Grid container direction='row' alignItems='center' justifyContent='center' style={{ paddingTop: 30 }}>
                <Typography variant='h5' style={{ color: '#fff' }}></Typography>
            </Grid>

            <Grid container direction='row' alignItems='center' justifyContent='center'>
                <IconButton onClick={onRewind} id='rewindff' className='control-icons' tabindex="-1">
                    <FastRewindIcon fontSize='inherit' />
                </IconButton>

                <IconButton onClick={onFastForward} className='control-icons' tabindex="-1">
                    <FastForwardIcon fontSize='inherit' />
                </IconButton>
            </Grid>

            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ padding: 10 }}
            >
                <IconButton onClick={onPlayPause} className="control-icons" tabindex="-1">
                    {videoStatus === "playing" ? (
                        <PauseIcon fontSize="inherit" />
                    ) : (
                        <PlayArrowIcon fontSize="inherit" />
                    )}
                </IconButton>

                <Button variant="text" tabIndex="-1" style={{ color: "#fff", marginLeft: -20 }}>
                    <Typography>{elapsedTime}/{totalDuration}</Typography>
                </Button>

                <Grid item xs={6} style={{ marginLeft: 50 }}  >
                    <PrettoSlider
                        className='posSlider'
                        min={0}
                        max={100}
                        value={played * 100}
                        ValueLabelComponent={(props) => (
                            <ValueLabelComponent {...props} value={elapsedTime} />
                        )}
                        onChange={onSeek}
                        onMouseDown={onSeekMouseDown}
                        onChangeCommitted={onSeekMouseUp}
                    />
                </Grid>

                <Grid item xs={1}>
                    <Grid container alignItems="center" direction="column">

                        <IconButton onClick={onMute} id='volumeicon' className='control-icons' tabindex="-1">
                            {muted ? (<VolumeOffIcon fontSize="large" />) : (<VolumeUpIcon fontSize="large" />)}
                        </IconButton>

                        <CustomSlider
                            min={0}
                            max={100}
                            value={volume * 100}
                            className='classes.volumeSlider'
                            color='rgba(255, 255, 255, 0.75)'
                            onChange={onVolumeChange}
                            onChangeCommitted={onVolumeSeekDown}
                            id='volumeslider'
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <IconButton onClick={onToggleFullScreen} className='classes.bottomIcons' tabIndex="-1">
                        {fullscreen ? (<FullscreenExitIcon fontSize="large" style={{ color: "#fff", marginRight: 20 }} />) : (<FullScreenIcon fontSize="large" style={{ color: "#fff", marginRight: 20 }} />)}

                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
});