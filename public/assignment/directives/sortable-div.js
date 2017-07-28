/**
 * Created by jggll on 7/24/17.
 */
(function () {
    angular.module('WebAppMaker').directive('sortableDiv', SortableDiv);

    function SortableDiv() {
        function linkFunc(scope, element, attrs) {
            let onMove = scope.onMoveCallback();
            if (!onMove) {
                onMove = () => {};
            }

            let startIdx = -1;

            element.sortable({
                start: (event, ui) => {
                    startIdx = ui.item.index();
                },
                stop: (event, ui) => {
                    let endIdx = ui.item.index();
                    onMove(startIdx, endIdx);
                },
                axis: 'y',
                handle: '.sortable-handle'
            });
        }

        return {
            scope: {
                onMoveCallback: '&onMoveCallback'
            },
            link: linkFunc
        };
    }
})();