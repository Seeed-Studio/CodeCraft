import classNames from 'classnames';
import React from 'react';
import styles from './course-material-preview.css';
import PropTypes, { func } from 'prop-types';
import { defineMessages, FormattedMessage, injectIntl,  } from 'react-intl';
import CourseMaterialBox from './course-material-box.jsx'

/**
 * 素材预览
 * 
 */

class CourseMaterialPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        
    }

    render() {
        const {
            className,
            authInfo,
            courseMaterialInfo,
            loginStatus
        } = this.props;

        let courseMaterialBasicInfo = courseMaterialInfo.courseMaterialBasicInfo;

        return (
            <div
                className={classNames(
                    styles.courseMaterialPreview,
                    className
                )}
            >
                <CourseMaterialBox
                    type={'materialPreview'}
                    courseMaterialInfo={courseMaterialInfo}
                    authInfo={authInfo}
                    showFullscreenBar={true}
                    isFullscreen={true}
                    loginStatus={loginStatus}
                    // course_material_data={course_material_data}
                    // onUpdateCourseMaterialBoxData={onUpdateCourseMaterialBoxData}
                >
                </CourseMaterialBox>

                {/*素材文件名称*/}
                <div className={styles.basicInfo}
                >
                    <div className={styles.name}>{courseMaterialBasicInfo ? courseMaterialBasicInfo.courseMaterialName : ''}</div>
                    <div className={styles.description}>{courseMaterialBasicInfo ? courseMaterialBasicInfo.courseMaterialDescription : ''}</div>
                </div>

            </div>
        )
    }

}

CourseMaterialPreview.propTypes = {
    authInfo: PropTypes.object,
    courseMaterialInfo: PropTypes.object,
}

export default injectIntl(CourseMaterialPreview);

