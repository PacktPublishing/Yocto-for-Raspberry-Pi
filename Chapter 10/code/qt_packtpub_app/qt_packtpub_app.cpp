#include "window.h"
#include <QApplication> 
 
int main(int argc, char *argv[])
{
    QApplication my_app(argc, argv);
 
    Window win;
    win.showMaximized();
    return my_app.exec();
}
