import { useEffect, useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [listItem, setListItem] = useState(props.initialData);
    const [sortingItem, setSortingItem] = useState(props.sorting);
    const [id, setId] = useState(-1);
    const [itemValue, setValue] = useState('');
    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        if (props.sorting == 'ASC') {
            setListItem(listItem.sort((x, y) => x.id - y.id));
            setSortingItem(props.sorting);
        } else {
            setListItem(listItem.sort((x, y) => y.id - x.id));
            setSortingItem(props.sorting);
        }
    }, [props.sorting]);

    return (
        <ul>
            {listItem.map((item) => {
                if (!canEdit || item.id != id) {
                    return (
                        <li
                            onClick={() => {
                                setId(item.id);
                                setCanEdit(true);
                            }}
                            key={item.id}
                        >
                            {item.name}
                        </li>
                    );
                } else {
                    return (
                        <input
                            key={item.id}
                            defaultValue={item.name}
                            type="text"
                            onKeyUp={function (f) {
                                if (f.key == 'Enter') {
                                    listItem.map((editing) => {
                                        if (editing.id == item.id) {
                                            item.name = itemValue;
                                        }
                                    });
                                    setCanEdit(false);
                                    setListItem(listItem);
                                }
                                if (f.key == 'Escape') {
                                    setCanEdit(false);
                                }
                            }}
                            onChange={function (f) {
                                setValue(f.target.value);
                            }}
                        ></input>
                    );
                }
            })}
        </ul>
    );
}
