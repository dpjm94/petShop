import React, { useState } from "react";
import { Radio, Collapse } from 'antd';
const { Panel } = Collapse;

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };
    
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Filter by price" key="1">
                {prices.map((p, i) => (
                <Radio.Group key={i}>
                    <input 
                        onChange={handleChange}
                        value={`${p._id}`}
                        name={p}
                        type="radio"
                        className="mr-2 ml-4" 
                    />
                    <label className="form-check__label">{p.name}</label>
                </Radio.Group>
            ))}
                </Panel>
            </Collapse>
        </div>
    )
};

export default RadioBox;
