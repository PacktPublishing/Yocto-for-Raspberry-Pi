#ifndef WINDOW_H
#define WINDOW_H
 
#include <QMainWindow>
#include <QPushButton>
 
namespace Ui
{
    class Window;
}
 
class Window : public QMainWindow
{
    Q_OBJECT
    public:
        explicit Window(QWidget *parent = 0);

        private slots:
            void handleButton();
            void quitButton();

    private:
            QPushButton *m_button;
};
 
#endif // WINDOW_H
