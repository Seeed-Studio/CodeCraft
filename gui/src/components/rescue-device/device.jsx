import { FormattedMessage } from 'react-intl';
import React from 'react';

export default [
    {
        type: 'mpython', label: (
            <FormattedMessage
                defaultMessage="mPython"
                description=""
                id="gui.devices.mpython.name"
            />
        )
    },
    {
        type: 'maixduino', label: (
            <FormattedMessage
                defaultMessage="M.A.R.K(cyberEye)"
                description=""
                id="gui.devices.maixduino.name"
            />
        )
    },
    {
        type: 'powering', label: (
            <FormattedMessage
                defaultMessage="Glint"
                description=""
                id="gui.devices.powering.name"
            />
        )
    },
];

