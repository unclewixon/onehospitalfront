import React from 'react';
import Select, { components } from 'react-select';
import { Image } from 'react-bootstrap';

import ErrorBoundary from '../../utils/ErrorBoundary';

const { Control, Option, SingleValue, Menu } = components;

/**
 * styles
 */
const iconStyle = {
	height: 16,
	maxWidth: '100%',
	display: 'block',
	marginRight: 8,
};

export function Content({ children, ...props }) {
	return (
		<div className="d-flex align-items-center">
			{props.data?.icon && (
				<Image
					src={props.data.icon}
					className="select__icon"
					style={iconStyle}
				/>
			)}
			<span className="select__content">{children}</span>
		</div>
	);
}

export default function CustomSelect({
	options,
	onlyOptions,
	value,
	disabled,
	...props
}) {
	const SelectComponents = {
		Option: ({ children, ...props }) => (
			<Option {...props}>
				<Content children={children} {...props} />
			</Option>
		),
		SingleValue: ({ children, ...props }) => (
			<SingleValue {...props}>
				<Content children={children} {...props} />
			</SingleValue>
		),
		Control: ({ children, ...props }) => (
			<Control className={'r-select '} {...props}>
				{children}
			</Control>
		),
		Menu: ({ children, ...props }) => (
			<Menu className="menu" {...props}>
				{children}
			</Menu>
		),
		IndicatorSeparator: () => null,
	};

	let _options = options;

	if (onlyOptions) {
		_options = options.filter(
			option =>
				!!onlyOptions.find(
					_option => _option?.toLowerCase() === option.value?.toLowerCase()
				)
		);
	}

	const defaultValue =
		options.find(
			option =>
				(option.value || '').toString()?.toLowerCase() ===
					(value || '').toString()?.toLowerCase() || ''
		) || '';

	return (
		<ErrorBoundary>
			<Select
				{...props}
				{...(disabled && { isDisabled: true })}
				value={defaultValue}
				options={_options}
				components={SelectComponents}
				styles={{
					menuList: () => ({
						paddingTop: 0,
						maxHeight: 300,
						overflow: 'auto',
						paddingBottom: 0,
					}),
				}}
			/>
		</ErrorBoundary>
	);
}
