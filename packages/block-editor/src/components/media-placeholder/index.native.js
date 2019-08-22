/**
 * External dependencies
 */
import { View, Text, TouchableWithoutFeedback } from 'react-native';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { MediaUpload, MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO } from '@wordpress/block-editor';
import { withTheme, useStyle } from '@wordpress/components';

/**
 * Internal dependencies
 */
import styles from './styles.scss';

function MediaPlaceholder( props ) {
	const { mediaType, labels = {}, icon, onSelectURL, theme } = props;

	const isImage = MEDIA_TYPE_IMAGE === mediaType;
	const isVideo = MEDIA_TYPE_VIDEO === mediaType;

	let placeholderTitle = labels.title;
	if ( placeholderTitle === undefined ) {
		placeholderTitle = __( 'Media' );
		if ( isImage ) {
			placeholderTitle = __( 'Image' );
		} else if ( isVideo ) {
			placeholderTitle = __( 'Video' );
		}
	}

	let instructions = labels.instructions;
	if ( instructions === undefined ) {
		if ( isImage ) {
			instructions = __( 'ADD IMAGE' );
		} else if ( isVideo ) {
			instructions = __( 'ADD VIDEO' );
		}
	}

	let accessibilityHint = __( 'Double tap to select' );
	if ( isImage ) {
		accessibilityHint = __( 'Double tap to select an image' );
	} else if ( isVideo ) {
		accessibilityHint = __( 'Double tap to select a video' );
	}

	const emptyStateContainerStyle = useStyle( styles.emptyStateContainer, styles.emptyStateContainerDark, theme );
	const emptyStateTitleStyle = useStyle( styles.emptyStateTitle, styles.emptyStateTitleDark, theme );

	return (
		<MediaUpload
			mediaType={ mediaType }
			onSelectURL={ onSelectURL }
			render={ ( { open, getMediaOptions } ) => {
				return (
					<TouchableWithoutFeedback
						accessibilityLabel={ sprintf(
							/* translators: accessibility text for the media block empty state. %s: media type */
							__( '%s block. Empty' ),
							placeholderTitle
						) }
						accessibilityRole={ 'button' }
						accessibilityHint={ accessibilityHint }
						onPress={ ( event ) => {
							props.onFocus( event );
							open();
						} }
					>
						<View style={ emptyStateContainerStyle }>
							{ getMediaOptions() }
							<View style={ styles.modalIcon }>
								{ icon }
							</View>
							<Text style={ emptyStateTitleStyle }>
								{ placeholderTitle }
							</Text>
							<Text style={ styles.emptyStateDescription }>
								{ instructions }
							</Text>
						</View>
					</TouchableWithoutFeedback>
				);
			} } />
	);
}

export default withTheme( MediaPlaceholder );