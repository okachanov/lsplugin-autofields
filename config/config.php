<?php
//
//  Autofields plugin
//  (P) rafrica.net team, 2010
//  http://we.rafrica.net/
//

$config = array ();

$config ['Autofields_Process_For_IDs'] = array (
      // clear_far_parent всегда должен быть "false", только для формы комментариев уставновить в "true"
      // clear_far_parent - строка с булевым значением!
      
      // поле ввода текста нового комментария
      array ('object_ID' => 'form_comment_text',
             'min_height' => 100,
             'max_height' => 500,
             'clear_far_parent' => 'true'
            ),

      // поле ввода текста нового топика
      array ('object_ID' => 'topic_text',
             'min_height' => 250,
             'max_height' => 500,
             'clear_far_parent' => 'false'
            ),
      
);

// --- Дальше ничего менять нет необходимости ---

// Ширина одной буквы в пикселях. Выбирается методом тыка. По умолчанию 8 для шрифта размером 12px
$config ['One_Letter_Width_Px'] = 8;

// Изменять размер полей с шагом в 3 строчки, которые по высоте занимают 50 пикселей
$config ['Change_Lines_Count'] = 3;       // т.е. 1 строка
$config ['Change_Lines_Height'] = 50;     // это 17 пикселей

return $config;
?>