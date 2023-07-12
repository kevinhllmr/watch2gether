import React, { forwardRef } from 'react'
import '../App.css';
import './PlayerControls.css';
import Axios from 'axios';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import FullScreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import Popover from "@material-ui/core/Popover";


function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

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

export default forwardRef(({ 
    onPlayPause, 
    playing, 
    onRewind, 
    onFastForward, 
    onToggleFullScreen, 
    played, 
    onSeek, 
    onSeekMouseDown, 
    onSeekMouseUp,
    elapsedTime,
    totalDuration
}, ref) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "playbackrate-popover" : undefined;

    return (
        <div id='controls-wrapper' ref={ref}>
            <Grid container direction='row' alignItems='center' justifyContent='center' style={{ paddingTop: 30 }}>
                <Typography variant='h5' style={{ color: '#fff' }}></Typography>
            </Grid>

            <Grid container direction='row' alignItems='center' justifyContent='center'>
                <IconButton onClick={onRewind} id='rewindff' className='control-icons' aria-label='rewind'>
                    <FastRewindIcon fontSize='inherit' />
                </IconButton>

                <IconButton onClick={onFastForward} className='control-icons' aria-label='forward'>
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
                <IconButton onClick={onPlayPause} className='control-icons' aria-label='play'>
                    {playing ? <PauseIcon fontSize='inherit' /> : <PlayArrowIcon fontSize='inherit' />}
                </IconButton>

                {/* <IconButton className='control-icons' aria-label='pause'>
                                    <PauseIcon fontSize='inherit' />
                                </IconButton> */}

                <Button variant="text" style={{ color: "#fff", marginLeft: -20 }}>
                    <Typography>{elapsedTime}/{totalDuration}</Typography>
                </Button>

                <Grid item xs={8} style={{ marginLeft: 50 }}  >
                    <PrettoSlider
                        className='posSlider'
                        min={0}
                        max={100}
                        value={played*100}
                        ValueLabelComponent={(props) => (
                            <ValueLabelComponent {...props} value={elapsedTime} />
                            )}
                        onChange={onSeek}
                        onMouseDown={onSeekMouseDown}
                        onChangeCommitted={onSeekMouseUp}
                    />
                </Grid>

                {/* <Grid item>
                                    <Grid container alignItems="center" direction="row">
                                        <IconButton className='classes.bottomIcons'>
                                            <PlayArrowIcon fontSize="large" />
                                        </IconButton>

                                        <IconButton className='classes.bottomIcons'>
                                            <VolumeUpIcon fontSize="large" />
                                        </IconButton>

                                        <Slider
                                            min={0}
                                            max={100}
                                            defaultValue={50}
                                            className='classes.volumeSlider'
                                        />
                                    </Grid>
                                </Grid> */}

                <Grid item>
                    {/* <Button
                                        onClick={handlePopover}
                                        variant="text"
                                        className='classes.bottomIcons'
                                    >
                                        <Typography>1X</Typography>
                                    </Button>

                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                        }}
                                        transformOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center",
                                        }}
                                    >
                                        <Grid container direction="column-reverse">
                                            {[0.5, 1, 1.5, 2].map((rate) => (
                                                <Button variant="text">
                                                    <Typography color="secondary">{rate}</Typography>
                                                </Button>
                                            ))}
                                        </Grid>
                                    </Popover> */}

                    <IconButton onClick={onToggleFullScreen} className='classes.bottomIcons'>
                    {onToggleFullScreen ? <FullScreenIcon fontSize="large" style={{ color: "#fff", marginRight: 20 }} /> : <FullscreenExitIcon fontSize="large" style={{ color: "#fff", marginRight: 20 }} />}
                        
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
});