import React, { useState, useCallback } from "react";
import styled from "styled-components";

type Props = {
	value: string;
	onChange: (value) => void;
};

const StyledInput = styled.input`
	border: 1px solid #f2f4f6;
	border-radius: 18px;
	background-color: #f2f4f6;
	padding: 10px;

	:focus {
		outline-width: 0px;
		border-color: #c4c6ca;
	}
`;

export default function Search(props: Props) {
	const [value, setValue] = useState(props.value);
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(e.target?.value);
			props.onChange(e.target?.value);
		},
		[setValue]
	);
	return (
		<StyledInput
			type="text"
			placeholder="Hledat..."
			value={value}
			onChange={handleChange}
		/>
	);
}
