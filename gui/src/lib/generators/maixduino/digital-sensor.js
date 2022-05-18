export default Blockly => {

    Blockly.Maixduino['sensing_maixduino_home_animal_detection_boolean'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['import_imageModel'] = 'from image_classification import *';
        var initCode = [
            `domestic_filename = 0x190000`,
            `domestic_labels = ['background', 'bird', 'cat', 'dog', 'hedgehog', 'mouse']`,
            `domestic_animals = ImageClassification(domestic_filename, domestic_labels, 1)`
        ]
        Blockly.Maixduino.definitions_[`var_animal_init`] = `${initCode.join('\n')}`;
        var domastic = block.getFieldValue('ANIMAL');
        var percent = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`domestic_animals.is_class("${domastic}", ${percent})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_home_animal_detection_string'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['import_imageModel'] = 'from image_classification import *';
        var initCode = [
            `domestic_filename = 0x190000`,
            `domestic_labels = ['background', 'bird', 'cat', 'dog', 'hedgehog', 'mouse']`,
            `domestic_animals = ImageClassification(domestic_filename, domestic_labels, 1)`
        ]
        Blockly.Maixduino.definitions_[`var_animal_init`] = `${initCode.join('\n')}`;
        var number = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`domestic_animals.get_classification_result(${number})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_ordinary_object_detection_boolean'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['import_imageModel'] = 'from image_classification import *';
        var initCode = [
            `common_filename = 0x352000`,
            `common_labels = ['backpack', 'bomb', 'book', 'chair', 'computer', 'cup_mug', 'pen','person', 'pizza', 'smartphone']`,
            `common_objects = ImageClassification(common_filename, common_labels, 1)`
        ]
        Blockly.Maixduino.definitions_[`var_common_init`] = `${initCode.join('\n')}`;
        var common_object = block.getFieldValue('OBJECTS');
        var percent = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`common_objects.is_class("${common_object}", ${percent})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_ordinary_object_detection_string'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['import_imageModel'] = 'from image_classification import *';
        var initCode = [
            `common_filename = 0x352000`,
            `common_labels = ['backpack', 'bomb', 'book', 'chair', 'computer', 'cup_mug', 'pen','person', 'pizza', 'smartphone']`,
            `common_objects = ImageClassification(common_filename, common_labels, 1)`
        ]
        Blockly.Maixduino.definitions_[`var_common_init`] = `${initCode.join('\n')}`;
        var number = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`common_objects.get_classification_result(${number})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_traffic_signs_detection_boolean'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['import_objectModel'] = 'from object_detection import *';
        var initCode = [
            `traffic_classes = ["limit_5","limit_80","no_forward","forward","left","right","u_turn","zebra","stop","yield"]`,
            `traffic_anchor = (0.57273, 0.677385, 1.87446, 2.06253, 3.33843, 5.47434, 7.88282, 3.52778, 9.77052, 9.16828)`,
            `traffic_filename = 0x5f5000`,
            `traffic = ObjectDetection(traffic_filename, traffic_classes, traffic_anchor, 1)`
        ]
        Blockly.Maixduino.definitions_[`var_traffic_init`] = `${initCode.join('\n')}`;
        var traffic = block.getFieldValue('TRAFFIC');
        var percent = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`traffic.is_object("${traffic}", ${percent})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_traffic_signs_detection_property'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['import_objectModel'] = 'from object_detection import *';
        var initCode = [
            `traffic_classes = ["limit_5","limit_80","no_forward","forward","left","right","u_turn","zebra","stop","yield"]`,
            `traffic_anchor = (0.57273, 0.677385, 1.87446, 2.06253, 3.33843, 5.47434, 7.88282, 3.52778, 9.77052, 9.16828)`,
            `traffic_filename = 0x5f5000`,
            `traffic = ObjectDetection(traffic_filename, traffic_classes, traffic_anchor, 1)`
        ]
        Blockly.Maixduino.definitions_[`var_traffic_init`] = `${initCode.join('\n')}`;
        var traffic = block.getFieldValue('TRAFFIC');
        var arg = block.getFieldValue('COORD');
        var percent = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`traffic.get_object_property("${traffic}", ${percent}, ${arg})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_traffic_signs_detection_string'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['import_objectModel'] = 'from object_detection import *';
        var initCode = [
            `traffic_classes = ["limit_5","limit_80","no_forward","forward","left","right","u_turn","zebra","stop","yield"]`,
            `traffic_anchor = (0.57273, 0.677385, 1.87446, 2.06253, 3.33843, 5.47434, 7.88282, 3.52778, 9.77052, 9.16828)`,
            `traffic_filename = 0x5f5000`,
            `traffic = ObjectDetection(traffic_filename, traffic_classes, traffic_anchor, 1)`
        ]
        Blockly.Maixduino.definitions_[`var_traffic_init`] = `${initCode.join('\n')}`;
        var number = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`traffic.get_detection_results(${number})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_num_detection_number'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['import_objectModel'] = 'from object_detection import *';
        var initCode = [
            `number_classes = ["0","1","2","3","4","5","6","7","8","9"]`,
            `number_anchor = (0.57273, 0.677385, 1.87446, 2.06253, 3.33843, 5.47434, 7.88282, 3.52778, 9.77052, 9.16828)`,
            `number_filename = 0x433000`,
            `number = ObjectDetection(number_filename, number_classes, number_anchor, 1)`
        ]
        Blockly.Maixduino.definitions_[`var_number_init`] = `${initCode.join('\n')}`;
        var number = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`number.get_detection_results(${number})`, Blockly.Maixduino.ORDER_ATOMIC];
    }
    
    Blockly.Maixduino['sensing_maixduino_num_detection_boolean'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['import_objectModel'] = 'from object_detection import *';
        var initCode = [
            `number_classes = ["0","1","2","3","4","5","6","7","8","9"]`,
            `number_anchor = (0.57273, 0.677385, 1.87446, 2.06253, 3.33843, 5.47434, 7.88282, 3.52778, 9.77052, 9.16828)`,
            `number_filename = 0x433000`,
            `number = ObjectDetection(number_filename, number_classes, number_anchor, 1)`
        ]
        Blockly.Maixduino.definitions_[`var_number_init`] = `${initCode.join('\n')}`;
        var number = block.getFieldValue('NUM_CARD') || 0;
        var percent = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`number.is_object("${number}", ${percent})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_num_detection_property'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['import_objectModel'] = 'from object_detection import *';
        var initCode = [
            `number_classes = ["0","1","2","3","4","5","6","7","8","9"]`,
            `number_anchor = (0.57273, 0.677385, 1.87446, 2.06253, 3.33843, 5.47434, 7.88282, 3.52778, 9.77052, 9.16828)`,
            `number_filename = 0x433000`,
            `number = ObjectDetection(number_filename, number_classes, number_anchor, 1)`
        ]
        Blockly.Maixduino.definitions_[`var_number_init`] = `${initCode.join('\n')}`;
        var number = block.getFieldValue('NUM_CARD') || 0;
        var arg = block.getFieldValue('COORD');
        var percent = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`number.get_object_property("${number}", ${percent}, ${arg})`, Blockly.Maixduino.ORDER_ATOMIC];
    }

    Blockly.Maixduino['sensing_maixduino_zoo_animal_detection_boolean'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['import_imageModel'] = 'from image_classification import *';
        var initCode = [
            `zoo_filename = 0x271000`,
            `zoo_labels = ['alligator', 'background', 'bear', 'elephant', 'giraffe', 'tiger']`,
            `zoo_animals = ImageClassification(zoo_filename, zoo_labels, 1)`
        ]
        Blockly.Maixduino.definitions_[`var_zooanimal_init`] = `${initCode.join('\n')}`;
        var zoom_animals = block.getFieldValue('ANIMAL');
        var percent = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`zoo_animals.is_class("${zoom_animals}", ${percent})`, Blockly.Maixduino.ORDER_ATOMIC];
    }


    Blockly.Maixduino['sensing_maixduino_zoo_animal_detection_string'] = function (block) {
        Blockly.Maixduino.definitions_['import_camare'] = 'from camera import * ';
        Blockly.Maixduino.definitions_['import_imageModel'] = 'from image_classification import *';
        var initCode = [
            `zoo_filename = 0x271000`,
            `zoo_labels = ['alligator', 'background', 'bear', 'elephant', 'giraffe', 'tiger']`,
            `zoo_animals = ImageClassification(zoo_filename, zoo_labels, 1)`
        ]
        Blockly.Maixduino.definitions_[`var_zooanimal_init`] = `${initCode.join('\n')}`;
        var number = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`zoo_animals.get_classification_result(${number})`, Blockly.Maixduino.ORDER_ATOMIC];
    }
    Blockly.Maixduino['sensing_maixduino_face_detection_register_face'] = function (block) {
        Blockly.Maixduino.definitions_['import_facerec'] = 'from face_rec import * ';
        var initCode = [
            `face_detection = FaceDetectionNN()`,
            `face_landmarks = LandmarksDetection(face_detection)`,
            `face_recognition = FaceRecognition(face_landmarks)`
        ]
        Blockly.Maixduino.definitions_[`var_face_init`] = `${initCode.join('\n')}`;
        var number = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var name = Blockly.Maixduino.valueToCode(block, 'NAME', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return `face_recognition.register_face(${number}, ${name}) \n`;
    }
    Blockly.Maixduino['sensing_maixduino_face_detection_is_id'] = function (block) {
        Blockly.Maixduino.definitions_['import_facerec'] = 'from face_rec import * ';
        var initCode = [
            `face_detection = FaceDetectionNN()`,
            `face_landmarks = LandmarksDetection(face_detection)`,
            `face_recognition = FaceRecognition(face_landmarks)`
        ]
        var number = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var id = Blockly.Maixduino.valueToCode(block, 'ID', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        Blockly.Maixduino.definitions_[`var_face_init`] = `${initCode.join('\n')}`;
        return [`face_recognition.is_ID(${number}, ${id})`, Blockly.Maixduino.ORDER_ATOMIC];

    }
    Blockly.Maixduino['sensing_maixduino_face_detection_get_recognition_property'] = function (block) {
        Blockly.Maixduino.definitions_['import_facerec'] = 'from face_rec import * ';
        var initCode = [
            `face_detection = FaceDetectionNN()`,
            `face_landmarks = LandmarksDetection(face_detection)`,
            `face_recognition = FaceRecognition(face_landmarks)`
        ]
        Blockly.Maixduino.definitions_[`var_face_init`] = `${initCode.join('\n')}`;
        var number = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var id = Blockly.Maixduino.valueToCode(block, 'ID', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var arg = block.getFieldValue('COORD');
        return [`face_recognition.get_recognition_property(${id}, ${number},${arg})`, Blockly.Maixduino.ORDER_ATOMIC];

    }
    Blockly.Maixduino['sensing_maixduino_face_detection_get_recognition_results'] = function (block) {
        Blockly.Maixduino.definitions_['import_facerec'] = 'from face_rec import * ';
        var initCode = [
            `face_detection = FaceDetectionNN()`,
            `face_landmarks = LandmarksDetection(face_detection)`,
            `face_recognition = FaceRecognition(face_landmarks)`
        ]
        Blockly.Maixduino.definitions_[`var_face_init`] = `${initCode.join('\n')}`;
        var number = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`face_recognition.get_recognition_results(${number})`, Blockly.Maixduino.ORDER_ATOMIC];

    }
    Blockly.Maixduino['sensing_maixduino_face_detection_clear_db'] = function (block) {
        Blockly.Maixduino.definitions_['import_facerec'] = 'from face_rec import * ';
        return `clear_db() \n`;
    }
    Blockly.Maixduino['sensing_maixduino_face_detection_get_detection_status'] = function (block) {
        Blockly.Maixduino.definitions_['import_facerec'] = 'from face_rec import * ';
        var initCode = [
            `face_detection = FaceDetectionNN()`,
        ]
        Blockly.Maixduino.definitions_[`var_face_init`] = `${initCode.join('\n')}`;
        var number = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        return [`face_detection.get_detection_status(${number})`, Blockly.Maixduino.ORDER_ATOMIC];

    }
    Blockly.Maixduino['sensing_maixduino_face_detection_get_detection_property'] = function (block) {
        Blockly.Maixduino.definitions_['import_facerec'] = 'from face_rec import * ';
        var initCode = [
            `face_detection = FaceDetectionNN()`,
        ]
        Blockly.Maixduino.definitions_[`var_face_init`] = `${initCode.join('\n')}`;
        var number = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var xy = block.getFieldValue('XY');
        return [`face_detection.get_detection_property(${number},${xy})`, Blockly.Maixduino.ORDER_ATOMIC];
    }
    Blockly.Maixduino['sensing_maixduino_face_detection_get_object_property'] = function (block) {
        Blockly.Maixduino.definitions_['import_facerec'] = 'from face_rec import * ';
        var initCode = [
            `face_detection = FaceDetectionNN()`,
            `face_landmarks = LandmarksDetection(face_detection)`,
        ]
        Blockly.Maixduino.definitions_[`var_face_init`] = `${initCode.join('\n')}`;
        var number = Blockly.Maixduino.valueToCode(block, 'NUMBER', Blockly.Maixduino.ORDER_ATOMIC) || 0;
        var xy = block.getFieldValue('XY');
        var arg = block.getFieldValue('ARGS');
        return [`face_landmarks.get_object_property(${number},${arg},${xy})`, Blockly.Maixduino.ORDER_ATOMIC];
    }
    
}
