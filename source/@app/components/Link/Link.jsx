import React from 'react';
import PropTypes from 'prop-types';
import history from '../../history';

/**
 * In order to use Link in parcel you can't just take it from `react-router`.
 * It will throw an error "<Link>s rendered outside of a router context cannot navigate."
 * Therefore I'm replacing it with custom <Link>, that uses `history` object.
 * It can work outside of router context
 */
class Link extends React.PureComponent {
    onClick = (e) => {
        const { to } = this.props;
        e.preventDefault();
        history.push(to);
    };

    render() {
        const { className, to } = this.props;
        return (
            <a
                onClick={this.onClick}
                className={className}
                href={to}
            >
                {this.props.children}
            </a>
        );
    }
}

Link.propTypes = {
    className: PropTypes.string,
    to: PropTypes.string.isRequired,
};

Link.defaultProps = {
    className: null,
};

export default Link;
