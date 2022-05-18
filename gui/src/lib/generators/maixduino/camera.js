export default Blockly => {

    Blockly.Maixduino['sensing_maixduino_print'] = function (block) {
        var value = Blockly.Maixduino.valueToCode(block, 'VALUE', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return `print(${value})\n`;
    }

    Blockly.Maixduino['sensing_maixduino_camera_set_threshold'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        var threshold = Blockly.Maixduino.valueToCode(block, 'THRESHOLD', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return `set_sensor_threshold(${threshold})\n`;
    }
    
    Blockly.Maixduino['sensing_maixduino_camera_is_ball'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_circle_detection'] = 'circle_detection = CircleDetection()';
        return [`circle_detection.get_detection_status()`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_is_ball_atsizecolor'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_circle_detection'] = 'circle_detection = CircleDetection()';
        Blockly.Maixduino.definitions_['var_color_recognition'] = 'color_recognition = ColorRecognition()';
        var color = block.getFieldValue('COLOR');
        return [`color_recognition.recognize_color(circle_detection,1, ${color})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_circle_detected_rgb'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_circle_detection'] = 'circle_detection = CircleDetection()';
        Blockly.Maixduino.definitions_['var_color_recognition'] = 'color_recognition = ColorRecognition()';
        return [`color_recognition.recognize_color(circle_detection,1, 4)`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_circle_detected_obj'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_circle_detection'] = 'circle_detection = CircleDetection()';
        return [`circle_detection.get_detection_property(0)`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_circle_detected_xyr'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_circle_detection'] = 'circle_detection = CircleDetection()';
        var xyr = block.getFieldValue('XY');
        return [`circle_detection.get_detection_property(${xyr})`, Blockly.Maixduino.ORDER_ATOMIC];
    }
    
    // Blockly.Maixduino['sensing_maixduino_camera_get_ball_coord'] = function (block) {
    //     Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
    //     var size = block.getFieldValue('SIZE');
    //     var xy = block.getFieldValue('XY');
    //     return [`Circle.get_circle_size(${size}, ${xy})`, Blockly.Maixduino.ORDER_ATOMIC];
    // }

    // Blockly.Maixduino['sensing_maixduino_camera_get_ball_value'] = function (block) {
    //     Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
    //     var size = block.getFieldValue('SIZE');
    //     return [`Circle.get_circle_size(${size}, 4)`, Blockly.Maixduino.ORDER_ATOMIC];
    // }

    Blockly.Maixduino['sensing_maixduino_camera_is_rectangle'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_rectangle_detection'] = 'rectangle_detection = RectangleDetection()';
        return [`rectangle_detection.get_detection_status()`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_is_rectangle_atsizecolor'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_rectangle_detection'] = 'rectangle_detection = RectangleDetection()';
        Blockly.Maixduino.definitions_['var_color_recognition'] = 'color_recognition = ColorRecognition()';
        var color = block.getFieldValue('COLOR');
        return [`color_recognition.recognize_color(rectangle_detection,2, ${color})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_rectangle_detected_rgb'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_rectangle_detection'] = 'rectangle_detection = RectangleDetection()';
        Blockly.Maixduino.definitions_['var_color_recognition'] = 'color_recognition = ColorRecognition()';
        return [`color_recognition.recognize_color(rectangle_detection,2, 4)`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_rectangle_detected_obj'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_rectangle_detection'] = 'rectangle_detection = RectangleDetection()';
        return [`rectangle_detection.get_detection_property(0)`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_rectangle_detected_xywh'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_rectangle_detection'] = 'rectangle_detection = RectangleDetection()';
        var xywh = block.getFieldValue('XY');
        return [`rectangle_detection.get_detection_property(${xywh})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    // Blockly.Maixduino['sensing_maixduino_camera_get_rectangle_coord'] = function (block) {
    //     Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
    //     var size = block.getFieldValue('SIZE');
    //     var xy = block.getFieldValue('XY');
    //     return [`Rects.get_rects_size(${size},${xy})`, Blockly.Maixduino.ORDER_ATOMIC];
    // }

    // Blockly.Maixduino['sensing_maixduino_camera_get_rectangle_value'] = function (block) {
    //     Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
    //     var size = block.getFieldValue('SIZE');
    //     return [`Rects.get_rects_size(${size}, 5)`, Blockly.Maixduino.ORDER_ATOMIC];
    // }

    /**---------颜色识别--------- */
    // Blockly.Maixduino['sensing_maixduino_camera_get_average_color'] = function (block) {
    //     Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
    //     var interestObject = Blockly.Maixduino.valueToCode(block, 'INTERESTOBJECT', Blockly.Maixduino.ORDER_ATOMIC) || '';
    //     return [`color.col_detech(${interestObject}, 4)`, Blockly.Maixduino.ORDER_ATOMIC];
    // }

    // Blockly.Maixduino['sensing_maixduino_camera_get_aera_color'] = function (block) {
    //     Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
    //     var interestObject = Blockly.Maixduino.valueToCode(block, 'INTERESTOBJECT', Blockly.Maixduino.ORDER_ATOMIC) || '';
    //     var color = block.getFieldValue('COLOR');
    //     return [`color.col_detech(${interestObject}, ${color})`, Blockly.Maixduino.ORDER_ATOMIC];
    // }

    // Blockly.Maixduino['sensing_maixduino_camera_get_ball_color'] = function (block) {
    //     Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
    //     var x = Blockly.Maixduino.valueToCode(block, 'X', Blockly.Maixduino.ORDER_ATOMIC) || 0;
    //     var y = Blockly.Maixduino.valueToCode(block, 'Y', Blockly.Maixduino.ORDER_ATOMIC) || 0;
    //     var r = Blockly.Maixduino.valueToCode(block, 'R', Blockly.Maixduino.ORDER_ATOMIC) || 0;
    //     return [`color.get_cricle_rgb(${x}, ${y}, ${r})`, Blockly.Maixduino.ORDER_ATOMIC];
    // }

    // Blockly.Maixduino['sensing_maixduino_camera_get_rectangle_color'] = function (block) {
    //     Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
    //     var xmin = Blockly.Maixduino.valueToCode(block, 'XMIN', Blockly.Maixduino.ORDER_ATOMIC) || 0;
    //     var xmax = Blockly.Maixduino.valueToCode(block, 'XMAX', Blockly.Maixduino.ORDER_ATOMIC) || 0;
    //     var ymin = Blockly.Maixduino.valueToCode(block, 'YMIN', Blockly.Maixduino.ORDER_ATOMIC) || 0;
    //     var ymax = Blockly.Maixduino.valueToCode(block, 'YMAX', Blockly.Maixduino.ORDER_ATOMIC) || 0;
    //     return [`color.get_rect_rgb(${xmin}, ${xmax}, ${ymin}, ${ymax})`, Blockly.Maixduino.ORDER_ATOMIC];
    // }
    
    //巡线
    // Blockly.Maixduino['sensing_maixduino_linepatrol_angle'] = function (block) {
    //     Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
    //     Blockly.Maixduino.definitions_['import_line_following'] = 'from line_following import * ';
    //     // var color = Blockly.Maixduino.valueToCode(block, 'COLOR', Blockly.Maixduino.ORDER_ATOMIC) || 0;
    //     var line_color = block.getFieldValue('COLOR');
    //     var r = Blockly.Maixduino.valueToCode(block, 'R', Blockly.Maixduino.ORDER_ATOMIC) || 0;
    //     var b = Blockly.Maixduino.valueToCode(block, 'B', Blockly.Maixduino.ORDER_ATOMIC) || 0;
    //     var g = Blockly.Maixduino.valueToCode(block, 'G', Blockly.Maixduino.ORDER_ATOMIC) || 0;
    //     return [`track_line(${line_color}, ${r}, ${b}, ${g})`, Blockly.Maixduino.ORDER_ATOMIC];
    // }

    Blockly.Maixduino['sensing_maixduino_camera_colorline_setcolor'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        var color = block.getFieldValue('COlOR');
        return `Set_GRAYSCALE_THRESHOLD(${color})\n`;
    }
    
    Blockly.Maixduino['sensing_maixduino_camera_colorline_setweight'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        var a = Blockly.Maixduino.valueToCode(block, 'A', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var b = Blockly.Maixduino.valueToCode(block, 'B', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var c = Blockly.Maixduino.valueToCode(block, 'C', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return `Set_roi_weight(${a}, ${b}, ${c})\n`;
    }

    Blockly.Maixduino['sensing_maixduino_camera_colorline_turnangle'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        return ['track_line()', Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_detectedface'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_face'] = 'face_detection = FaceDetection()';
        return ['face_detection.get_detection_status()', Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_detectedface_position'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_face'] = 'face_detection = FaceDetection()';
        var xywh = block.getFieldValue('XY');
        return [`face_detection.get_detection_property(${xywh})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_detected_apriltag'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_tag'] = 'apriltag_detection = AprilTagDetection()';
        var Tag_ID = Blockly.Maixduino.valueToCode(block, 'Tag_ID', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`apriltag_detection.get_detection_status(${Tag_ID})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_detected_apriltag_position'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_tag'] = 'apriltag_detection = AprilTagDetection()';
        var Tag_ID = Blockly.Maixduino.valueToCode(block, 'Tag_ID', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var xywh = block.getFieldValue('XY');
        return [`apriltag_detection.get_detection_property(${xywh}, ${Tag_ID})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_camera_init_trackingtarget'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_colortr'] = 'color_tracking = ColorTracking()';
        return 'color_tracking.initialize_color_tracking()\n';
    }

    Blockly.Maixduino['sensing_maixduino_camera_target_position'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['var_colortr'] = 'color_tracking = ColorTracking()';
        var xywh = block.getFieldValue('XY');
        return [`color_tracking.get_object_property(color_tracking.threshold, ${xywh})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

}
