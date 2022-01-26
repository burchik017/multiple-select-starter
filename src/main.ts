import 'normalize.css';

import { MultipleSelect } from './components';
import './style.scss';

/** Customer **/
const selectConts = document.querySelectorAll < HTMLDivElement > ('.item_container');
const customerSelect = document.querySelector < HTMLSelectElement > ('select[name="customer"]');

for (let index = 0; index < selectConts?.length; index++) {

    let count: number = 3;
    let DefaultText: string = "[A] - Продукция сельского хозяйства, лесного хозяйства рыбоводства и рыболовства";

    let countResult = selectConts[index].querySelector('.top_container .result span') as HTMLElement;
    const customerSelects = selectConts[index].querySelector < HTMLSelectElement > ('select[name="customer"]');
    const allOption = selectConts[index].querySelectorAll < HTMLOptionElement > ('option');
    const applyBtn = selectConts[index].querySelector < HTMLInputElement > ('input[class="applyBtn"]');
    const resetBtn = selectConts[index].querySelector < HTMLInputElement > ('input[class="resetBtn"]');


    let div = document.createElement('div');
    div.className = "changed-selected-option-text";
    customerSelects?.parentElement?.prepend(div);
    let span = document.createElement('span');
    span.innerHTML = DefaultText;
    selectConts[index].querySelector('.changed-selected-option-text')?.prepend(span);
    let newSpan: any = selectConts[index].querySelector('.changed-selected-option-text span');

    [countResult?.parentElement, customerSelects?.parentElement].forEach(item => {
        item?.addEventListener('click', () => {
            selectConts[index]?.classList.add('show');
        });
    });

    document?.addEventListener('click', (e) => {
        const btnBack = e.target as HTMLSelectElement;
        if (btnBack.className == "switchBack" ||
            document.querySelector('.item_container.show') &&
            !document.querySelector('.wrapper:hover') &&
            document.querySelector('body:hover')) {
            selectConts[index]?.classList.remove('show');
        };
    });

    resetBtn?.addEventListener('click', function () {
        for (let i = 0; i < allOption.length; i++) {
            allOption[i].removeAttribute('selected');
        };
        count = 0;
        newSpan.innerHTML = "Нажмите, что бы выбрать элемент";
        countResult.innerText = '0';
        countDetect();
    });

    function countDetect() {
        if (count >= 1) {
            customerSelects?.setAttribute("style", 'border-left: 3px solid blue');
        };
        if (count == 0) {
            customerSelects?.setAttribute("style", 'border-left: 1px solid #000');
            newSpan.innerHTML = "Нажмите, что бы выбрать элемент";
        };
    };


    for (let i = 0; i < allOption.length; i++) {
        allOption[i].addEventListener('click', function () {
            this.toggleAttribute('selected');
            if (this.hasAttribute('selected')) {
                newSpan.innerHTML = this.innerText;
                countResult.innerText = `${++count}`;
                countArrSelected();
            } else {
                countResult.innerText = `${--count}`;
                countArrSelected();
                newSpan.innerHTML = selectConts[index].querySelector('option[selected]')?.innerHTML;
            };
            countDetect();
        });
    };


    function countArrSelected() {
        let arrSelected: string | any[] = [];
        for (let i = 0; i < allOption.length; i++) {
            if (allOption[i].hasAttribute('selected')) {
                arrSelected?.push(allOption[i].textContent);
            };
        };
        return arrSelected;
    };

    countArrSelected();


    applyBtn?.addEventListener('click', () => {
        if (count == 0) {
            alert("Элементы выбранные из списка - невыбранны");
        } else {
            alert("Элементы выбранные из списка - " + countArrSelected());
        }
    });
};



new MultipleSelect(customerSelect, {
    onChange: (selectedOptions) => {
        console.log('customerSelect -> selectedOptions:', selectedOptions);
    },
});

customerSelect?.addEventListener('change', (event) => {
    const target = event.target as HTMLSelectElement;

    console.log('customerSelect -> value:', target.value);
});

/** Region **/

// const regionSelect = document.querySelector<HTMLSelectElement>(
//     'select[name="region"]'
// );

// new MultipleSelect(regionSelect, {
//     onChange: (selectedOptions) => {
//         console.log('regionSelect -> selectedOptions:', selectedOptions);
//     },
// });

// regionSelect?.addEventListener('change', (event) => {
//     const target = event.target as HTMLSelectElement;

//     console.log('regionSelect -> value:', target.value);
// });
