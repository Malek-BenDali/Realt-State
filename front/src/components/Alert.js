import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function Alert({alerts}) {
    return (
        alerts !== null && alerts.length > 0 && alerts.map(alerte =>(
            <div key={alerte.id} className={`alert alert--${alerte.alertType}`} >
                { alerte.msg }
            </div>
        ))
    )
}

Alert.propTypes= {
    alerts: PropTypes.array.isRequired
}

const maptStateToProps = state =>({
    alerts : state.alert
})

export default connect(maptStateToProps)(Alert)
