import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import { FormattedMessage,defineMessages,injectIntl } from 'react-intl';
import classNames from 'classnames';
import styles from './three-axis-accelerometer-modal.css';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {
    closeThreeAxisAccelerometerModal,
} from '../../reducers/modals';
import cancel from './image/cancel.png';

const threestyle = {
    height: 300, // we can control scene size by setting container dimensions
    width:300,
    margin:0
};

class ThreeAxisAccelerometerModal extends React.Component {

    constructor(props) {
        super(props);

        bindAll(this, [
            'threeAxisAccelerometerCallback',
            'startAnimationLoop',
            'handleClose'
        ]);

        this.state = {
            xAxis:1,
            yAxis:1,
            zAxis:1
        }

        props.vm.runtime.accelerometerMode.setAccelerometerCallback(this.threeAxisAccelerometerCallback)
    }

    componentDidMount() {
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }
    handleClose() {
        this.props.closeThreeAxisAccelerometerModalState();
    }

    threeAxisAccelerometerCallback(x,y,z) {
        console.log('threeAxisAccelerometerCallback',x,y,z)
        this.setState({
            xAxis:x,
            yAxis:y,
            zAxis:z
        })
    }
    sceneSetup () {
        // get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        //Scene 构造器，构造一个新的场景
        this.scene = new THREE.Scene();
        //PerspectiveCamera 透视相机
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );
        this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls 控制
        this.controls = new OrbitControls( this.camera, this.mount );
        // WebGLRenderer 构造器
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        this.mount.appendChild( this.renderer.domElement ); // mount using React ref
    };
    addCustomSceneObjects () {
        //BoxGeometry 立方几何体
        const geometry = new THREE.BoxGeometry(4, 4, 4);
        const material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        } );
        this.cube = new THREE.Mesh( geometry, material );
        this.scene.add( this.cube );

        const lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        this.scene.add( lights[ 0 ] );
        this.scene.add( lights[ 1 ] );
        this.scene.add( lights[ 2 ] );
    };

    startAnimationLoop(){
        this.cube.rotation.x = this.state.xAxis;
        this.cube.rotation.y = this.state.yAxis;
        this.cube.rotation.z = this.state.zAxis;
        this.renderer.render( this.scene, this.camera );

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    handleWindowResize () {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.renderer.setSize( width, height );
        this.camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
    };
    render() {
        const {
            hidden,
        } = this.props;

        const {

        } = this.state;

        return (
            <div className={styles.modal} style={{display:hidden?"none":"block"}}>
                <img className={styles.cancel} src={cancel} onClick={this.handleClose}></img>
                <div style={threestyle} ref={ref => (this.mount = ref)} />
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    closeThreeAxisAccelerometerModalState: () => {
        dispatch(closeThreeAxisAccelerometerModal());
    },
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(ThreeAxisAccelerometerModal));
