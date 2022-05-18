import React from 'react'
import bindAll from 'lodash.bindall';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import Button from '../button-special/button.jsx';

import styles from './edgeimpulse-modal.css';

import {
    closeEdgeImpulseModal,
} from '../../reducers/modals';

import {
    edgeimpulseLogin,
    edgeimpulseSeeedLogin,
    edgeimpulseQueryUser,
    edgeimpulseGetHmackeys,
    edgeimpulseQueryProjects,
    edgeimpulseTrainingData,
    edgeimpulseTestingData
} from '../../lib/busi-proxy/edgeimpulse-proxy.js';

import crypto from 'crypto';

import Modal from '../../containers/modal.jsx';

// const localMessages = defineMessages({
//     baudRateText: {
//         id: 'gui.arduinoMonitor.baudRateText',
//         defaultMessage: 'Baud rate',
//         description: ''
//     }
// });

class EdgeimpulseModal extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
            'onClose',
            'handleResponse',
            'onLogin',
            'onQueryProjects',
            'onQueryUser',
            // 'onUpload',
        ]);
        this.serialShowEl = null;
        this.timeStamp = (new Date).valueOf();
        this.text = '';
    }

    componentDidMount() {
        this.props.vm.on('response', this.handleResponse);
        this.initData();
    }

    componentWillUnmount() {
        this.props.vm.removeListener('response', this.handleResponse);
    }

    handleResponse(data) {
        console.log(data.toString())
        // var dataString = "";
        // for (var i = 0; i < data.length; i++) {
        //     console.log(data[i],String.fromCharCode(data[i]))
        //     dataString += String.fromCharCode(data[i]);
        //     console.log(dataString,i)

        // }
        // console.log(dataString)
    }

    async initData() {
        const edgeimpulseAuthInfoStr = localStorage.getItem('edgeimpulseAuthInfo');
        let edgeimpulseAuthInfo = edgeimpulseAuthInfoStr ? JSON.parse(edgeimpulseAuthInfoStr) : {};
        //自动登录
        if (!edgeimpulseAuthInfo.jwtToken) {
            //免密登录
            let loginResp = await this.onLogin();
            if (loginResp.success) {
                let status = loginResp.status;//userWasCreated userAlreadyExists userNotManagedByThirdParty
                edgeimpulseAuthInfo.jwtToken = loginResp.jwtToken;
                //查询用户信息
                let userResp = await edgeimpulseQueryUser();
                if (userResp.success&&userResp.projects&&userResp.projects.length>0) {
                    let userID = userResp.id;
                    let projectID = userResp.projects[0].id;
                    edgeimpulseAuthInfo.userID = userID;
                    edgeimpulseAuthInfo.projectID = projectID;
                    //查询上传密钥
                    let hmackeysResp = await edgeimpulseGetHmackeys(projectID);
                    if (hmackeysResp.success) {
                        let hmacKeys = hmackeysResp.hmacKeys;
                        if (hmacKeys&&hmacKeys.length>0) {
                            let hmacKey = hmacKeys[0].hmacKey
                            edgeimpulseAuthInfo.hmacKey = hmacKey;
                        }
                    }
                }

                localStorage.setItem('edgeimpulseAuthInfo', JSON.stringify(edgeimpulseAuthInfo));
            }
        }
    }

    onClose() {
        this.props.closeEdgeImpulseModalState();
    }

    onLogin() {
        // const params = { username: 'chenwenhao123', password: '12345678' };
        // edgeimpulseLogin(params).then((res) => {
        //     console.log(res)
        //     if (res.success) {
        //         const edgeimpulseAuthInfo = Object.assign({}, {
        //             token: res.token
        //         });
        //         localStorage.setItem('edgeimpulseAuthInfo', JSON.stringify(edgeimpulseAuthInfo));
        //     }
        // })
        const params = {
            name: 'guojiaxin',
            username: 'guojiaxin',
            email: 'herong.que@chaihuo.org',
            privacyPolicy: true,

        };
        return edgeimpulseSeeedLogin(params)
        // edgeimpulseSeeedLogin(params).then((res) => {
        //     console.log(res)
        //     if (res.success) {
        //         let status = res.status;//userWasCreated userAlreadyExists userNotManagedByThirdParty
        //         const edgeimpulseAuthInfo = Object.assign({}, {
        //             jwtToken: res.jwtToken
        //         });
        //         localStorage.setItem('edgeimpulseAuthInfo', JSON.stringify(edgeimpulseAuthInfo));
        //     }
        // })
        
    }

    onQueryUser() {

        edgeimpulseQueryUser().then((res) => {
            console.log(res)
            if (res.success) {
                
            }
        })
    }

    onQueryProjects() {
        edgeimpulseQueryProjects().then((res) => {
            console.log(res)
            if (res.success) {
                
            }
        })
    }

    onUpload(type) {
        console.log(type)
        const hmac_key = "e3e4cb3b44351f4595ef0f4a53a7ef75";
        const API_KEY = "ei_0bee44dea672ab3a2bbfe9c87ef00a2c454fe8bb189dba1a043b14d9e31697f3";

        // empty signature (all zeros). HS256 gives 32 byte signature, and we encode in hex, so we need 64 characters here
        let emptySignature = Array(64).fill('0').join('');

        let data = {
            protected: {
                ver: "v1",
                alg: "HS256",
                iat: Math.floor(Date.now() / 1000) // epoch time, seconds since 1970
            },
            signature: emptySignature,
            payload: {
                device_name: "f03118d2-bf59-4e41-a7cb-1670e865dad2",
                device_type: "Wio-test",
                interval_ms: 25,
                sensors: [
                    { "name": "light_sensor", "units": "N/A" }
                ],
                // values: [
                //     [83], [86], [94], [96], [101], [102], [101], [105], [108], [252], [281], [281], [280], [287], [279], [275], [273], [108], [103], [101], [75], [75], [70], [60], [60], [221], [241], [256], [265], [266], [262], [256], [254], [251], [251], [258], [244], [218], [216], [73], [79], [76], [77], [92], [92], [101], [101], [103], [110], [245], [247], [247], [248], [249], [247], [238], [106], [101], [101], [97], [87], [79], [88], [203], [227], [248], [250], [253], [251], [253], [252], [252], [253], [254], [261], [253], [253], [251], [249], [228], [203], [57], [57], [56], [55], [66], [78], [101], [107], [106], [202], [254], [256], [257], [257], [259], [257], [262], [260], [259], [258], [253], [252], [115], [102], [108], [73], [65], [64], [57], [56], [209], [241], [254], [256], [258], [258], [262], [260], [261], [260], [261], [259], [258], [257], [243], [200], [44], [40], [39], [42], [40], [63], [98], [99], [105], [257], [259], [260], [263], [261], [261], [269], [270], [265], [262], [258], [263], [112], [100], [92], [54], [42], [46], [48], [55], [210], [243], [253], [261], [255], [257], [256], [256], [257], [256], [260], [256], [254], [261], [243], [218], [70], [54], [55], [60], [99], [104], [103], [107], [255], [257], [259], [261], [260], [259], [259], [258], [258], [257], [257], [253], [106], [104], [106], [55], [50], [48], [51], [49], [208], [243], [261], [253], [253], [262], [256], [259], [260], [257], [257], [262], [257], [256], [255], [250], [224], [213], [57], [57], [54], [55], [66], [68], [98], [101], [102], [109], [253], [254], [260], [258], [260], [266], [258], [257], [258], [256], [254], [105], [101], [99], [67], [53], [47], [54], [179], [232], [251], [253], [254], [254], [254], [255], [254], [256], [253], [257], [252], [251], [250], [247], [214], [55], [55], [57], [55], [68], [99], [104], [106], [250], [252], [253], [256], [253], [258], [258], [254], [254], [254], [254], [251], [251], [247], [112], [102], [86], [69], [53], [46], [47], [176], [217], [245], [243], [245], [246], [247], [247], [254], [246], [251], [248], [249], [250], [244], [217], [185], [69], [57], [60], [75], [83], [101], [106], [251], [256], [257], [257], [257], [258], [260], [259], [259], [264], [257], [256], [254], [259], [107], [103], [85], [76], [75], [66], [65], [214], [216], [255], [253], [257], [256], [262], [257], [258], [258], [262], [257], [257], [261], [256], [251], [234], [213], [54], [54], [47], [52], [67], [66], [100], [100], [103], [234], [259], [260], [260], [259], [261], [260], [259], [260], [262], [257], [254], [114], [104], [102], [82], [66], [60], [52], [52], [197], [244], [255], [257]
                // ]
            }
        };

        if (type == 'train') {
            data.payload.values = [[83], [86], [94], [96], [101], [102], [101], [105], [108], [252], [281], [281], [280], [287], [279], [275], [273], [108], [103], [101], [75], [75], [70], [60], [60], [221], [241], [256], [265], [266], [262], [256], [254], [251], [251], [258], [244], [218], [216], [73], [79], [76], [77], [92], [92], [101], [101], [103], [110], [245], [247], [247], [248], [249], [247], [238], [106], [101], [101], [97], [87], [79], [88], [203], [227], [248], [250], [253], [251], [253], [252], [252], [253], [254], [261], [253], [253], [251], [249], [228], [203], [57], [57], [56], [55], [66], [78], [101], [107], [106], [202], [254], [256], [257], [257], [259], [257], [262], [260], [259], [258], [253], [252], [115], [102], [108], [73], [65], [64], [57], [56], [209], [241], [254], [256], [258], [258], [262], [260], [261], [260], [261], [259], [258], [257], [243], [200], [44], [40], [39], [42], [40], [63], [98], [99], [105], [257], [259], [260], [263], [261], [261], [269], [270], [265], [262], [258], [263], [112], [100], [92], [54], [42], [46], [48], [55], [210], [243], [253], [261], [255], [257], [256], [256], [257], [256], [260], [256], [254], [261], [243], [218], [70], [54], [55], [60], [99], [104], [103], [107], [255], [257], [259], [261], [260], [259], [259], [258], [258], [257], [257], [253], [106], [104], [106], [55], [50], [48], [51], [49], [208], [243], [261], [253], [253], [262], [256], [259], [260], [257], [257], [262], [257], [256], [255], [250], [224], [213], [57], [57], [54], [55], [66], [68], [98], [101], [102], [109], [253], [254], [260], [258], [260], [266], [258], [257], [258], [256], [254], [105], [101], [99], [67], [53], [47], [54], [179], [232], [251], [253], [254], [254], [254], [255], [254], [256], [253], [257], [252], [251], [250], [247], [214], [55], [55], [57], [55], [68], [99], [104], [106], [250], [252], [253], [256], [253], [258], [258], [254], [254], [254], [254], [251], [251], [247], [112], [102], [86], [69], [53], [46], [47], [176], [217], [245], [243], [245], [246], [247], [247], [254], [246], [251], [248], [249], [250], [244], [217], [185], [69], [57], [60], [75], [83], [101], [106], [251], [256], [257], [257], [257], [258], [260], [259], [259], [264], [257], [256], [254], [259], [107], [103], [85], [76], [75], [66], [65], [214], [216], [255], [253], [257], [256], [262], [257], [258], [258], [262], [257], [257], [261], [256], [251], [234], [213], [54], [54], [47], [52], [67], [66], [100], [100], [103], [234], [259], [260], [260], [259], [261], [260], [259], [260], [262], [257], [254], [114], [104], [102], [82], [66], [60], [52], [52], [197], [244], [255], [257]];
        } else if (type == 'test') {
            data.payload.values = [[196], [61], [82], [204], [50], [84], [228], [56], [92], [273], [280], [284], [287], [287], [287], [294], [287], [288], [288], [287], [293], [285], [139], [62], [58], [257], [80], [44], [229], [81], [68], [50], [232], [258], [102], [91], [73], [67], [73], [197], [159], [64], [73], [93], [128], [220], [49], [71], [35], [63], [234], [46], [256], [281], [283], [283], [283], [283], [282], [282], [281], [280], [281], [279], [285], [286], [278], [285], [277], [275], [272], [267], [70], [48], [200], [96], [52], [35], [54], [63], [52], [196], [223], [70], [75], [77], [75], [74], [75], [74], [79], [77], [74], [219], [183], [52], [64], [40], [38], [78], [71], [44], [78], [276], [281], [286], [288], [283], [281], [282], [279], [279], [277], [277], [277], [279], [277], [276], [275], [276], [267], [74], [51], [247], [101], [59], [60], [251], [93], [64], [152], [233], [250], [264], [269], [271], [280], [272], [271], [266], [246], [218], [53], [78], [257], [203], [44], [84], [252], [49], [63], [271], [277], [278], [278], [281], [278], [285], [279], [280], [278], [277], [277], [275], [276], [277], [277], [275], [268], [73], [50], [251], [79], [46], [231], [96], [55], [239], [246], [87], [73], [245], [265], [277], [281], [281], [282], [285], [290], [286], [282], [280], [272], [251], [226], [69], [105], [235], [55], [88], [93], [61], [258], [54], [80], [275], [279], [279], [279], [283], [278], [278], [278], [276], [275], [274], [279], [281], [274], [274], [275], [273], [272], [270], [260], [69], [56], [249], [60], [40], [238], [79], [51], [219], [249], [106], [83], [69], [63], [76], [75], [63], [66], [81], [95], [266], [239], [48], [72], [257], [70], [49], [77], [258], [56], [61], [99], [276], [284], [280], [278], [278], [277], [284], [284], [275], [274], [273], [271], [278], [266], [98], [61], [118], [213], [65], [45], [242], [88], [60], [232], [99], [98], [110], [271], [273], [277], [280], [282], [291], [285], [288], [280], [272], [257], [234], [62], [83], [250], [59], [68], [246], [38], [62], [252], [83], [50], [77], [272], [275], [275], [275], [274], [276], [273], [273], [272], [270], [276], [266], [246], [71], [51], [234], [81], [49], [205], [88], [65], [214], [249], [85], [64], [242], [262], [276], [281], [284], [284], [277], [267], [239], [58], [81], [268], [235], [56], [91], [51], [57], [266], [50], [89], [281], [284], [283], [282], [280], [280], [277], [276], [278], [279], [273], [276], [273], [271], [273], [275], [264], [92], [62], [225], [84], [42], [219], [81], [46], [231], [91], [67], [209], [234], [249], [261], [265], [261], [251]];
        }

        let encoded = JSON.stringify(data);
        // now calculate the HMAC and fill in the signature
        let hmac = crypto.createHmac('sha256', hmac_key);
        hmac.update(encoded);
        let signature = hmac.digest().toString('hex');

        // update the signature in the message and re-encode
        data.signature = signature;
        encoded = JSON.stringify(data);

        if (type=='train') {
            edgeimpulseTrainingData(encoded).then((res) => {
                console.log(res)
            })
        } else if (type=='test') {
            edgeimpulseTestingData(encoded).then((res) => {
                console.log(res)
            })
        }
    }

    render() {

        return (
            <Modal
                id={'edgeimpulse'}
                contentLabel={'edgeimpulse'}
                isOpen={true}
                showClose={true}
                onRequestClose={this.onClose}
            >
                <div className={classNames(styles.modal)}>
                    <div className={classNames(styles.title)}>
                        选择你想训练的模型类型
                    </div>

                    <Button className={classNames(styles.serialSendBt)} onClick={this.onLogin}>
                        三轴加速传感器
                    </Button>

                    <Button onClick={this.onQueryUser}>
                        光感传感器
                    </Button>

                    {/* <Button onClick={this.onQueryProjects}>
                        queryProjects
                    </Button>

                    <Button onClick={this.onUpload.bind(this,'train')}>
                        upload train data
                    </Button>

                    <Button onClick={this.onUpload.bind(this,'test')}>
                        upload test data
                    </Button> */}
                    
                </div>
            </Modal>
        );
    }

}

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
});

const mapDispatchToProps = dispatch => ({
    closeEdgeImpulseModalState: () => {
        dispatch(closeEdgeImpulseModal());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(EdgeimpulseModal));