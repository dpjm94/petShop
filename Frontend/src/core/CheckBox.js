import React, { useState } from "react";
import { Checkbox, Collapse } from 'antd';
const { Panel } = Collapse;

const CheckBox = ({ categories, handleFilters }) => {
    const [checked, setCheked] = useState([]);

    const handleToggle = c => () => {
        // return the first index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state > push
        // else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };
    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Filter by Categories" key="1">
                    {categories.map((c, i) => (
                    <React.Fragment key={i}>
                        <Checkbox 
                            onChange={handleToggle(c._id)}
                            checked={checked.indexOf(c._id) === -1 ? false : true}
                            type="checkbox"
                        />
                        <label className="form-check__label">{c.name}</label>
                    </React.Fragment>
                ))}
            </Panel>
        </Collapse>
    </div>
);
};

export default CheckBox;
