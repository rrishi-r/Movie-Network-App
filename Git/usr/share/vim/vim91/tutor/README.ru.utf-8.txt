«Учебник» — это практическое пособие для начинающих пользователей редактора Vim.

На освоение представленного материала большинству начинающих пользователей
потребуется менее часа. По окончанию курса вы сможете выполнять несложные
операции над текстом с помощью редактора Vim.

Файл, содержащий обучающие уроки, называется «tutor». Чтобы начать с ним
работать, просто наберите команду "vim tutor" и следуйте инструкциям,
преведённым в уроках. Задания в учебнике предполагают редактирование файла,
поэтому НЕ ДЕЛАЙТЕ ЭТОГО В ОРИГИНАЛЬНОЙ КОПИИ ФАЙЛА.

Для полноценной работы с учебником вы можете использовать программу "vimtutor".
При запуске этой программы будет создана временная копия файла для работы с ним.

Я планировал добавление в учебник более развёрнутых уроков, но на это уже не
хватило времени. Если занятия вам понравились, то, пожалуйста, напишите мне об
этом и присылайте любые улучшения, которые вы сделаете.

Боб Уэр (Bob Ware), Colorado School of Mines, США, Колорадо, Голден, 80401,
(303) 273-3987
bware@mines.colorado.edu bware@slate.mines.colorado.edu bware@mines.bitnet


Переводы
-----------

Файлы tutor.xx и tutor.xx.utf-8 являются переводами учебника (где xx — код
языка). Кодировка текста в файлах tutor.xx может быть latin1 или другая
традиционная кодировка. Если не требуется перевод в такой традиционной
кодировке, вам нужно просто подготовить файл tutor.xx.utf-8.
Если необходима другая кодировка текста, вы также можете сделать такой файл,
его наименование должно быть tutor.xx.enc (замените «enc» на фактическое
название кодировки). Возможно, что для этого потребуется настроить файл
«tutor.vim».
Для создания файла tutor.xx из tutor.xx.utf-8 можно использовать команду "make".
Посмотрите файл «Makefile», чтобы получить подробной информации. (Для некоторых
языков файл tutor.xx.utf-8 создаётся из tutor.xx в силу сложившихся причин).

[Брам Моленар (Bram Moolenaar) и др. изменили этот файл для редактора Vim]
