'use client';

// @mui
import { useTheme } from '@mui/material/styles';

/***************************  ILLUSTARION - DUMPING DOODLE  ***************************/

export default function DumpingDoodle() {
  const theme = useTheme();

  return (
    <svg viewBox="0 0 1024 768" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M720.391 431.873C745.902 426.273 771.521 414.731 792.391 398.873C788.015 415.547 781.9 436.405 768.979 448.487C764.067 453.081 757.511 456.082 751.536 459.001C742.748 463.292 733.735 467.13 724.663 470.776C708.65 477.212 691.829 484.342 674.767 487.466C670.031 488.332 667.619 487.482 663.676 484.64C657.054 479.866 651.066 474.131 645.146 468.535C635.656 459.564 626.425 450.303 617.391 440.873C651.613 440.79 686.901 439.225 720.391 431.873ZM474.391 488.873C479.145 491.974 483.9 495.075 488.655 498.175C522.233 520.075 555.812 541.974 589.391 563.873C573.391 574.54 557.391 585.206 541.391 595.873C547.058 601.873 552.724 607.873 558.391 613.873C553.09 616.889 547.788 619.905 542.488 622.921C532.768 628.452 523.048 633.981 513.329 639.512C509.884 641.472 506.439 643.432 502.994 645.392C502.184 645.853 501.037 646.817 500.186 646.741C498.908 646.625 496.599 644.417 495.56 643.742C492.275 641.605 488.995 639.461 485.719 637.31C475.637 630.694 465.592 624.023 455.586 617.292C431.056 600.789 406.58 584.088 383.097 566.114C372.247 557.811 362.175 549.203 353.699 538.4C344.373 526.514 336.671 513.389 329.9 499.908C324.198 488.559 319.15 476.876 314.673 464.992C313.134 460.908 309.325 454.369 309.394 449.882C309.431 447.47 311.527 444 312.338 441.768C314.262 436.477 316.187 431.185 318.111 425.894C319.098 423.178 321.037 419.807 321.375 416.915C321.786 413.424 320.092 408.647 319.547 405.198C319.283 403.521 319.32 398.795 318.047 397.847C317.201 397.216 314.009 397.536 312.991 397.457C304.734 396.823 296.478 396.187 288.221 395.552C266.079 393.849 243.939 392.146 221.798 390.443C215.704 389.974 208.857 390.3 202.875 388.987C198.356 387.996 195.531 384.372 194.18 380.135C190.125 367.41 186.291 354.484 183.822 341.346C181.434 328.648 183.74 318.768 188.947 307.019C193.505 296.735 198.888 286.536 205.009 277.083C206.775 274.356 206.765 274.94 209.934 275.505C222.936 277.822 235.938 280.14 248.94 282.458C292.947 290.303 336.954 298.147 380.961 305.992C396.477 308.758 411.994 311.524 427.509 314.289C429.775 314.694 434.22 314.596 436.217 315.842C437.242 316.482 438.007 318.378 438.67 319.406C441.543 323.859 444.416 328.312 447.289 332.766C463.416 357.762 480.023 382.445 496.483 407.223C514.786 434.772 533.088 462.323 551.391 489.873C525.724 489.54 500.058 489.206 474.391 488.873Z"
        fill={theme.palette.primary.lighter}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M443.025 46.9937C451.271 50.6687 455.623 60.8367 459.952 68.1897C465.148 77.0137 469.855 86.2547 472.509 96.1907C475.229 106.372 475.606 117.535 474.4 127.981C473.87 132.577 472.626 136.76 471.312 141.157C469.907 145.857 472.095 148.545 475.428 151.859C482.352 158.743 491.07 164.025 496.209 172.506C500.562 179.692 505.624 181.022 513.831 181.33C534.214 182.095 554.189 181.464 574.383 185.363C579.51 186.353 584.605 187.565 589.649 188.918C591.306 189.362 593.039 190.138 594.747 190.294C597.209 190.518 597.629 189.539 599.468 188.592C607.56 184.427 617.83 188.428 625.918 190.713C646.335 196.482 665.599 204.335 684.105 214.74C704.088 225.976 725.391 234.698 745.19 246.268C764.317 257.445 781.5 271.512 799.34 284.56C817.482 297.831 834.69 312.191 851.467 327.143C867.683 341.594 884.448 355.778 898.953 371.993C912.177 386.776 922.624 404.277 929.632 422.874C931.971 429.081 930.531 432.991 923.219 430.943C922.572 437.222 917.891 439.846 911.957 438.504C913.779 443.772 917.941 450.908 915.56 456.577C912.393 464.114 903.322 458.628 898.874 455.691C899.357 461.75 901.934 471.586 896.93 476.476C889.175 484.053 876.087 474.397 870.594 468.735C856.598 454.306 847.647 436.452 835.221 420.886C819.82 401.594 802.471 383.405 785.059 365.94C783.685 364.561 768.187 347.933 765.966 350.193C772.728 361.39 778.132 373.715 787.586 383.017C792.074 376.714 795.325 379.82 796.168 386.149C797.18 393.757 798.308 401.769 796.905 409.394C794.147 424.402 784.673 438.676 774.718 449.915C764.304 461.67 751.374 470.621 737.503 477.826C729.65 481.905 721.774 485.727 713.327 488.405C709.544 489.605 705.755 490.996 701.869 491.829C698.133 492.63 694.093 492.574 690.635 494.387C721.61 509.175 755.88 515.405 786.928 529.812C794.422 533.289 809.471 542.327 801.867 552.486C795.985 560.346 782.617 560.624 773.843 562.192C780.298 568.285 779.336 573.942 770.851 577.259C767.442 578.591 763.889 579.209 760.254 579.304C757.786 579.368 753.521 578.49 751.527 580.43C759.22 583.955 769.708 583.741 776.031 589.934C782.482 596.252 774.777 601.335 769.012 603.772C761.429 606.976 751.002 610.356 743.288 606.492C737.191 603.438 731.562 604.1 724.82 603.297C717.868 602.469 710.996 600.981 704.29 598.98C678.755 591.361 655.242 577.261 632.692 563.391C610.163 549.534 589.152 533.791 569.722 515.826C564.929 511.394 560.937 506.12 556.038 501.829C550.882 497.313 545.484 496.908 538.888 496.983C523.893 497.153 508.927 494.485 493.94 496.244C515.481 512.479 538.244 526.779 560.904 541.361C569.526 546.91 578.59 554.309 588.727 556.728C593.174 557.79 602.716 558.494 604.193 563.977C605.273 567.978 601.851 568.65 599.801 570.821C596.832 573.965 601.012 575.016 604.076 576.319C607.937 577.96 611.462 578.489 615.668 578.055C622.106 577.39 627.157 577.611 633.156 580.369C642.583 584.701 652.704 587.033 662.155 591.27C666.069 593.025 667.098 598.255 668.987 601.806C671.957 607.387 675.389 612.701 678.757 618.046C685.106 628.122 690.585 638.486 699.594 646.524C707.489 653.568 716.28 659.807 724.855 666C738.247 675.675 755.283 687.637 750.979 706.614C746.723 725.374 727.279 723.357 712.463 720.007C706.227 718.597 697.705 714.654 691.418 716.507C685.993 718.107 682.257 718.345 676.629 717.068C670.103 715.586 663.536 714.622 656.925 713.6C643.066 711.457 629.092 707.922 615.849 703.288C609.497 701.065 604.192 698.098 599.189 693.556C597.703 692.208 596.622 690.295 594.646 690.311C592.966 690.325 590.367 693.307 589.067 694.342C584.963 697.61 580.424 700.339 575.74 696.452C572.75 693.97 570.089 688.57 574.413 686.014C577.728 684.054 583.782 686.3 586.159 682.594C588.648 678.714 583.084 673.085 581.342 669.931C576.084 673.5 568.346 680.719 562.248 674.744C557.363 669.959 562.798 667.055 567.303 665.524C572.872 663.63 579.316 663.874 576.478 656.427C574.865 652.198 572.285 648.408 571.87 643.792C571.555 640.283 572.567 636.906 572.592 633.425C572.636 627.203 565.946 621.844 560.118 620.37C556.559 619.469 555.502 622.51 553.316 624.841C550.104 628.267 546 630.831 541.909 633.066C535.197 636.732 528.152 639.642 521.118 642.6C516.457 644.56 508.218 647.128 511.546 653.068C516.416 661.764 505.001 657.602 500.886 655.629C491.312 651.039 481.644 646.657 472.19 641.816C452.801 631.885 434.961 619.622 417.835 606.2C401.023 593.023 384.608 579.026 369.333 564.083C361.934 556.843 354.861 549.229 348.561 541.006C341.794 532.174 336.096 522.597 329.201 513.853C322.047 504.778 314.976 495.974 310.367 485.269C306.097 475.35 301.25 464.278 301.173 453.381C301.088 441.342 301.136 430.529 305.117 418.981C306.778 414.163 308.773 409.145 311.668 404.932C312.5 403.721 316.868 399.58 315.973 397.929C316.023 398.022 306.049 399.546 305.006 399.645C298.385 400.278 291.724 399.143 285.128 398.527C265.624 396.707 245.936 397.389 226.504 394.711C219.178 393.701 211.229 394.762 204.078 392.901C200.7 392.023 199.868 390.088 197.386 388.505C196.253 387.782 195.041 388.021 193.987 387.017C192.753 385.841 192.486 384.144 191.94 382.61C189.023 374.42 184.108 367.107 181.22 358.901C177.973 349.671 178.12 340.106 178.356 330.458C173.533 330.842 168.467 330.874 163.942 328.922C160.29 340.399 144.561 340.192 134.892 339.321C122.817 338.234 108.659 337.097 102.539 324.978C95.3469 310.735 95.8219 293.444 94.9519 277.9C93.9299 259.645 93.6389 241.117 94.5359 222.851C95.2989 207.315 98.8389 191.188 108.884 178.858C117.747 167.979 133.08 161.612 145.141 171.764C154.206 179.396 158.164 193.141 158.757 204.588C159.059 210.413 158.787 215.645 165.958 214.03C168.715 213.409 171.221 212.405 173.254 215.233C175.047 217.724 174.224 221.325 171.954 223.188C169.897 224.878 165.895 224.592 164.486 227.104C163.09 229.595 165.298 233.585 167.944 234.092C170.957 234.669 173.277 230.798 176.311 232.594C179.091 234.241 177.639 237.318 175.776 239.12C173.572 241.254 171.449 241.699 173.025 245.076C174.233 247.667 176.651 249.392 177.736 252.139C180.414 258.916 181.298 268.654 178.32 275.47C183.488 276.045 195.983 282.158 200.048 277.213C201.523 275.419 201.699 272.784 203.293 270.954C205.168 268.8 207.789 267.884 210.564 267.537C216.497 266.795 222.567 268.6 228.33 269.763C237.884 271.693 247.496 273.383 257.092 275.088C276.401 278.519 295.889 280.907 315.15 284.593C334.37 288.272 353.392 292.924 372.4 297.557C382.368 299.986 392.29 302.716 402.332 304.82C411.717 306.785 421.497 308.234 430.232 312.391C428.505 301.709 423.686 291.893 420.682 281.567C417.592 270.946 416.724 260.344 418.468 249.407C420.067 239.386 422.435 229.647 427.548 220.791C429.615 217.21 431.89 213.643 434.868 210.755C436.985 208.701 439.966 206.993 441.64 204.544C443.291 202.127 442.94 201.566 439.967 200.453C438.314 199.833 436.813 199.646 435.246 198.778C433.805 197.98 432.565 196.531 430.871 196.255C426.963 195.617 421.25 199.405 417.67 200.753C412.783 202.592 407.734 204.248 402.518 204.808C385.399 206.646 365.097 196.716 353.361 184.686C349.444 180.671 340.455 171.439 344.108 165.316C346.036 162.084 349.483 162.852 352.377 161.384C356.909 159.085 354.037 155.271 351.866 152.244C345.952 143.998 341.986 134.561 337.752 125.386C333.442 116.048 327.534 107.7 322.69 98.6607C319.213 92.1747 315.183 84.9197 313.585 77.7017C311.633 68.8867 317.599 67.6407 324.893 66.3777C347.963 62.3817 370.678 57.0127 393.541 52.0137C402.655 50.0217 411.813 47.9967 420.986 46.2977C428.135 44.9737 436.16 43.9357 443.025 46.9937ZM645.517 596.91C633.62 597.522 621.65 600.164 621.269 614.046C622.712 640.388 639.843 660.078 657.941 677.55C662.507 681.958 666.976 686.631 671.935 690.604C674.853 692.941 678.034 694.01 681.191 695.862C681.965 696.316 683.302 697.837 684.021 698.068C685.727 698.62 685.875 698 687.539 697.824C691.167 697.442 691.837 699.97 694.595 702.038C699.828 705.961 709.22 705.387 715.365 706.614C721.04 707.747 743.63 715.93 742.614 704.144C741.621 692.628 729.339 687.033 720.684 681.89C708.621 674.722 696.186 666.963 686.029 657.194C676.373 647.905 670.069 635.195 663.584 623.627C659.542 616.418 658.423 610.305 657.256 602.249C656.762 598.841 656.712 597.726 653.378 597.151C650.8 596.707 648.118 596.776 645.517 596.91ZM604.125 594.996C597.252 597.223 592.061 602.735 588.64 608.969C586.889 612.16 585.885 615.378 585.306 618.946C584.569 623.487 582.873 628.337 584.142 632.902C586.444 641.188 592.485 650.234 597.23 657.343C602.565 665.338 609.493 674.312 617.912 679.213C626.015 683.931 635.801 685.188 643.316 691.011C642.643 687.809 639.64 685.445 637.283 683.448C633.847 680.537 630.842 677.647 627.923 674.181C621.467 666.517 616.101 658.217 612.662 648.762C609.33 639.6 607.422 629.288 607.847 619.521C608.049 614.873 608.848 609.935 610.855 605.695C612.195 602.861 614.572 600.451 615.599 597.471C617.949 590.639 607.553 593.885 604.125 594.996ZM453.413 368.547C443.818 369.637 434.305 371.48 424.64 372.373C405.101 374.177 384.82 375.244 367.114 384.577C341.351 398.159 311.681 428.299 320.616 460.047C331.171 497.55 353.736 531.462 381.988 558.001C400.024 574.943 419.777 590.21 439.591 605C458.756 619.307 480.928 628.691 500.686 642.066C502.025 622.357 514.409 604.283 529.053 591.744C536.922 585.007 545.181 578.552 554.005 573.111C558.34 570.437 562.83 568.178 567.401 565.945C570.871 564.251 574.705 561.729 578.671 561.54C578.607 558.634 571.318 557.561 569.307 556.877C562.367 554.518 555.707 550.903 549.279 547.401C535.284 539.777 522.353 530.473 509.403 521.229C503.073 516.711 496.643 512.328 490.381 507.714C484.742 503.56 479.743 498.156 473.684 494.619C467.451 490.981 460.083 490.221 453.129 488.88C444.775 487.268 436.555 485.354 428.161 483.94C414.144 481.579 400.913 473.324 387.991 467.699C383.647 465.807 377.018 464.166 373.702 460.584C370.697 457.339 371.482 452.328 375.334 450.104C381.959 446.28 393 451.267 399.264 453.735C410.852 458.3 422.36 462.386 434.657 464.725C451.501 467.929 467.508 473.926 484.375 477.065C502.564 480.449 520.796 484.153 539.288 485.401C534.757 476.422 527.245 468.962 521.394 460.84C514.681 451.523 507.978 442.2 501.323 432.841C489.594 416.342 476.514 399.763 467.599 381.526C464.542 375.274 461.534 367.624 453.413 368.547ZM540.516 608.953C537.846 609.38 535.83 612.05 534.015 613.815C528.396 619.277 522.896 624.685 518.321 631.089C525.4 628.099 531.173 622.888 537.997 619.463C540.456 618.228 549.14 615.476 547.39 612.036C546.406 610.104 542.481 608.639 540.516 608.953ZM573.002 586.954C566.071 591.684 558.856 595.913 551.547 600.025C556.673 601.973 561.792 604.661 565.999 608.192C567.923 609.807 571.878 614.534 574.66 613.346C577.246 612.242 578.651 605.844 579.903 603.535C583.108 597.623 587.592 592.039 592.413 587.377C585.17 582.529 580.316 581.963 573.002 586.954ZM514.5 329.468C508.953 331.012 503.449 332.699 497.906 334.255C486.839 337.362 475.529 339.959 463.972 339.959C462.399 342.853 466.904 347.573 468.288 349.78C471.921 355.575 475.023 361.79 478.317 367.789C485.3 380.505 492.919 392.728 501.138 404.678C509.442 416.752 516.943 429.398 525.447 441.326C533.678 452.872 542.732 464.088 551.648 475.112C586.386 518.063 634.802 547.683 682.387 574.292C695.725 581.75 709.621 588.321 724.392 592.394C730.491 594.076 736.712 595.5 742.916 596.753C747.085 597.594 754.022 599.479 757.861 596.782C745.808 592.006 730.014 590.164 720.278 580.923C714.251 575.202 720.861 570.934 727.006 569.871C738.897 567.814 751.221 572.994 762.893 569.633C759.773 563.909 750.806 564.182 745.351 562.713C738.454 560.854 738.198 557.369 744.765 554.999C752.847 552.082 762.164 553.664 770.587 553.127C774.698 552.865 791.928 552.178 786.724 544.281C782.628 538.068 772.657 536.326 766.131 534.034C756.975 530.819 748.081 525.801 738.756 523.31C729.635 520.873 720.342 519.376 711.221 516.803C701.702 514.118 692.329 511.134 683.283 507.105C665.843 499.337 649.674 488.791 634.946 476.685C619.77 464.209 606.466 449.912 594.225 434.58C587.784 426.514 581.655 418.214 575.39 410.014C569.338 402.096 562.495 394.549 557.65 385.808C552.293 376.14 545.35 367.315 539.802 357.681C536.796 352.46 533.561 347.339 530.758 342.006C528.766 338.214 527.409 332.654 524.715 329.359C522.182 326.262 517.754 328.563 514.5 329.468ZM258.277 451.984C260.136 453.683 259.827 454.383 259.469 456.541C258.736 460.963 257.927 465.303 257.587 469.79C256.421 485.136 258.585 501.051 260.976 516.208C263.363 531.331 269.101 545.303 277.944 557.811C286.512 569.93 296.854 579.585 310.479 585.532C312.818 586.553 322.081 590.299 321.482 593.755C321.032 596.354 316.223 594.884 314.494 594.513C290.003 589.265 269.247 567.118 256.87 546.502C251.746 537.968 248.45 529.291 245.62 519.858C245.206 518.48 239.275 498.963 241.278 498.718C239.549 485.203 239.032 468.771 245.419 456.262C247.805 451.59 253.396 447.527 258.277 451.984ZM215.548 454.891C213.313 465.079 214.052 475.474 214.545 485.794C214.635 487.673 215.709 493.468 212.6 493.357C210.403 493.279 208.652 487.669 208.113 486.23C204.848 477.498 203.688 467.663 205.319 458.459C205.834 455.545 206.612 452.01 209.816 450.998C212.603 450.118 215.795 451.69 215.548 454.891ZM787.868 407.855C786.491 408.52 785.884 409.786 785.473 411.176C774.699 420.36 762.024 429.249 749.426 435.73C738.172 441.518 725.14 443.958 712.857 446.576C684.766 452.564 656.795 454.983 628.778 447.233C640.227 457.797 650.609 471.834 665.042 478.564C672.213 481.908 680.15 479.891 687.38 477.773C696.251 475.174 705.176 472.519 713.761 469.073C729.982 462.563 747.332 455.359 760.972 444.2C767.019 439.253 771.948 433.138 776.287 426.677C778.772 422.976 780.875 419.018 783.39 415.344C784.839 413.226 788.013 410.617 787.868 407.855ZM668.175 219.993C667.763 225.218 664.686 229.607 661.972 233.897C660.126 236.814 656.531 240.332 658.236 243.641C660.26 247.568 666.713 250.077 670.057 252.763C675.008 256.74 679.645 261.085 684.204 265.5C692.384 273.423 700.854 281.103 708.859 289.195C716.466 296.883 723.847 304.716 733.441 309.958C754.505 321.467 773.05 337.548 791.456 352.839C810.222 368.428 828.757 384.815 845.041 403.026C853.755 412.771 860.997 423.468 867.209 434.95C870.403 440.857 873.827 446.634 877.027 452.539C878.443 455.151 880.042 457.688 881.33 460.368C882.287 462.359 882.91 465.583 884.678 467.058C888.178 459.293 882.718 449.022 879.553 442.027C877.39 437.246 875.267 432.446 873.132 427.651C871.633 424.288 868.519 420.228 868.348 416.475C867.932 407.35 879.682 413.915 882.904 416.84C890.88 424.08 895.48 434.964 901.125 443.946C902.453 436.795 888.216 425.752 894.11 419.519C898.785 414.576 907.403 426.156 910.019 429.292C911.813 420.45 907.215 411.8 902.409 404.723C897.054 396.835 890.864 389.334 884.521 382.23C869.694 365.627 852.749 350.849 835.985 336.252C819.309 321.73 802.14 307.799 785.043 293.778C768.44 280.163 751.588 266.549 733.031 255.649C722.626 249.537 711.712 244.424 701.09 238.719C689.966 232.745 679.42 225.748 668.175 219.993ZM523.144 199.852C522.659 199.973 519.852 200.31 519.642 200.557C518.727 201.635 519.947 205.121 521.026 205.747C517.303 208.53 513.121 211.063 508.389 211.496C511.366 214.417 517.022 219.527 516.142 224.238C514.931 230.719 507.144 226.174 503.99 224.213C498.929 221.064 493.757 217.724 490.051 212.976C487.698 209.963 486.897 206.768 485.136 203.523C484.18 201.76 484.736 201.441 482.618 201.319C480.198 201.182 476.058 203.477 473.815 204.389C470.351 205.799 466.973 207.426 463.715 209.264C457.705 212.657 452.079 216.774 447.15 221.611C436.944 231.623 430.032 244.777 429.156 259.18C436.399 258.321 443.485 255.198 449.588 251.302C453.935 248.528 458.369 245.268 459.136 253.096C459.434 256.145 458.581 263.245 456.751 265.604C455.042 267.807 454.304 266.021 452.53 267.342C450.479 268.872 451.562 271.074 451.562 273.222C450.573 272.392 449.585 271.563 448.598 270.733C446.81 273.069 448.833 271.818 449.508 273.231C449.902 274.055 447.208 276.427 446.67 276.847C445.557 277.717 444.942 276.997 443.669 278.247C442.851 279.051 441.969 280.855 441.082 281.859C436.497 287.047 442.568 295.177 444.969 300.678C446.746 304.752 448.685 308.745 450.534 312.784C451.888 315.74 452.619 319.249 454.417 321.973C457.985 327.38 466.161 324.426 471.498 323.764C478.737 322.865 485.846 321.945 493.093 321.264C497.341 320.865 502.141 318.393 496.686 315.194C491.272 312.02 472.569 311.419 472.448 303.254C472.32 294.574 484.38 293.131 490.428 293.877C499.275 294.967 504.992 297.2 511.044 303.877C509.688 291.144 500.654 280.613 498.638 267.838C498.09 264.368 496.407 242.98 504.746 252.22C509.212 257.169 512.749 264.659 516.05 270.382C521.046 279.046 525.4 288.049 529.987 296.93C534.363 305.406 540.774 313.55 543.839 322.567C545.564 327.639 547.971 338.299 553.445 340.887C556.952 342.546 562.873 340.375 566.495 339.846C568.733 339.519 570.916 339.199 572.836 337.907C573.83 337.238 574.812 335.504 576.067 335.31C579.683 334.751 580.616 340.275 580.37 342.818C579.99 346.74 578.189 347.757 574.531 348.213C580.697 351.234 571.197 360.684 569.53 364.452C569.443 364.259 568.361 361.611 567.557 361.614C565.959 361.619 572.453 374.404 572.943 375.293C576.349 381.464 580.626 387.012 584.763 392.7C587.141 395.969 590.563 403.702 595.4 402.971C598.079 402.567 603.645 397.051 605.75 400.833C607.649 404.244 601.783 407.903 600.9 410.615C599.419 415.164 604.991 419.947 608.274 422.332C616.976 428.653 628.259 430.145 638.557 432.053C636.589 429.4 632.303 427.955 632.218 424.156C632.16 421.573 633.986 420.163 632.752 417.352C631.736 415.037 629.189 413.692 628.431 411.211C627.595 408.475 628.913 405.367 630.417 403.107C636.79 393.526 651.026 397.513 659.374 401.866C658.758 402.137 658.246 402.529 657.84 403.042L657.742 403.172L657.764 403.157C658.835 402.501 663.479 404.557 664.058 404.974C665.887 406.292 668.354 409.364 669.617 411.267C673.683 417.394 674.265 424.862 672.153 431.807C697.61 431.807 721.592 425.022 744.374 414.207C749.577 411.738 754.688 410.157 759.617 407.049C764.681 403.858 769.492 400.315 774.465 396.993C779.136 393.872 778.714 391.998 775.585 387.561C771.775 382.161 768.419 376.404 764.19 371.311C763.541 372.722 763.287 375.545 761.899 376.412C760.365 377.37 758.957 375.467 757.923 376.187C758.015 376.123 754.747 381.2 754.221 379.936C755.583 383.207 750.131 381.117 749.165 380.511C749.39 383.577 746.842 386.216 745.411 382.118C741.524 385.675 732.307 382.419 737.278 376.934C739.732 374.226 742.403 372.787 743.946 369.252C745.673 365.296 746.276 360.818 746.493 356.541C747.005 346.458 741.549 341.75 734.709 335.212C730.89 331.561 726.902 328.096 722.973 324.566C719.519 321.464 716.531 317.622 712.907 314.746C710.304 312.681 708.227 312.087 705.701 313.88C704.66 314.619 704.321 315.558 702.984 316.27C701.27 317.183 698.728 317.748 696.816 317.986C687.204 319.183 676.079 315.888 667.271 312.338C664.859 311.366 663.704 309.784 661.616 308.581C660.296 307.82 659.171 308.281 657.77 307.372C654.108 304.997 654.292 301.185 656.954 298.217C663.191 291.262 672.15 297.518 678.524 291.902C686.466 284.904 673.225 275.228 667.876 270.945C663.595 267.516 659.917 266.774 654.685 265.874C653.589 265.685 646.321 263.587 648.864 266.603C643.217 266.457 640.44 266.48 635.894 270.005C634.701 270.929 633.115 271.803 632.787 273.38C632.614 274.212 634.328 274.379 634.332 274.371C634.101 274.93 632.376 275.945 632.127 276.123C635.035 276.468 634.28 282.176 633.53 282.208L633.486 282.203L633.571 282.277C634.841 283.479 631.976 285.331 631.004 285.642C628.245 286.525 625.627 284.606 623.782 282.689C619.652 278.398 616.653 271.098 616.918 265.15C617.289 256.802 622.771 251.962 627.293 245.704C630.678 241.022 625.649 238.532 622.149 235.594C617.865 232.001 612.039 227.583 610.63 221.859C609.347 216.645 612.904 214.861 617.462 216.429C623.622 218.547 628.607 223.998 634.066 227.409C638.911 230.436 645.027 236.617 650.947 236.97C649.861 233.105 644.482 233.515 642.401 230.644C639.653 226.851 643.922 225.16 647.152 225.595C649.659 225.932 656.812 231.24 656.626 225.12C656.526 221.841 651.057 220.743 648.676 219.795C636.577 214.979 624.184 211.694 611.353 209.463C607.194 208.741 606.13 209.247 604.12 213.002C603.438 214.277 600.986 220.143 599.642 216.254C597.884 219.441 597.372 222.837 593.55 224.119C588.686 225.749 582.433 223.336 577.952 221.465C574.106 219.859 570.451 217.607 567.983 214.173C566.755 212.466 565.86 210.571 565.28 208.551C564.788 206.836 565.021 204.025 564.131 202.467C562.644 199.862 559.099 200.424 556.362 200.164C550.252 199.583 544.219 199.058 538.077 198.986C532.974 198.927 528.102 198.617 523.144 199.852ZM655.983 428.742C654.029 429.442 657.5 431.781 658.647 431.505C658.177 430.747 657.397 428.236 655.983 428.742ZM657.742 403.172L657.689 403.212C657.621 403.274 657.576 403.352 657.556 403.449C657.6 403.377 657.646 403.307 657.693 403.24L657.742 403.172ZM696.828 341.739C698.598 343.225 697.884 346.666 699.095 348.78C702.336 354.44 708.177 360.023 713.681 363.442C719.609 367.123 722.414 371.9 723.866 378.568C724.167 379.946 725.073 381.859 724.631 383.286C724.217 384.619 722.72 385.062 722.26 386.25C722.049 386.793 722.931 390.996 722.824 391.009C722.313 391.071 720.821 388.956 720.83 388.967C720.239 390.434 720.444 392.1 718.851 392.885L718.657 392.971L718.682 392.989C719.079 393.297 720.891 394.801 720.459 395.131C719.856 395.591 718.382 395.276 717.63 395.544C716.443 395.968 715.587 397.025 714.445 397.517C711.382 398.836 707.85 398.429 704.617 397.964C697.807 396.986 690.144 394.55 685.221 389.505C679.258 383.394 680.673 377.062 680.135 370.207C679.531 362.517 685.078 350.86 689.534 344.898C691.054 342.862 694.1 339.452 696.828 341.739ZM206.975 281.908C206.59 282.818 206.974 284.238 206.748 285.237C206.292 287.261 205.118 289.033 203.988 290.732C201.873 293.912 199.745 296.826 198.302 300.414C194.759 309.221 191.473 318.713 189.776 328.051C186.136 348.099 198.289 364.634 198.951 384.16C204.532 378.284 213.019 378.003 220.581 377.986C230.644 377.964 240.614 378.387 250.639 379.268C269.817 380.954 289.422 381.638 307.598 388.648C309.599 389.42 311.1 389.754 313.109 390.175C315.316 390.638 314.147 389.605 315.761 390.911C316.195 391.263 316.368 392.532 316.822 392.977C319.17 395.274 320.576 393.713 322.565 391.249C328.037 384.466 333.497 378.302 340.537 373.031C355.534 361.8 372.332 356.614 390.819 354.944C401.415 353.987 411.761 353.435 422.403 353.538C432.564 353.636 443.292 353.822 452.918 357.458C450.524 350.606 446.435 344.466 443.138 338.038C441.537 334.917 440.052 331.636 438.016 328.764C436.227 326.239 433.526 324.176 432.287 321.293C432.066 321.872 431.845 322.451 431.623 323.029C412.076 317.43 391.919 314.414 371.878 311.212C351.747 307.995 331.866 303.537 311.778 300.108C301.692 298.386 291.569 297.351 281.41 296.197C271.631 295.087 262.203 292.916 252.561 291.071C242.796 289.202 233.292 286.938 223.69 284.364C219.664 283.285 215.853 281.796 211.935 280.497C208.81 279.462 208.1 279.24 206.975 281.908ZM639.232 317.451C639.816 319.848 637.95 322.94 637.352 325.216C636.674 327.797 635.203 328.831 634.436 331.178C633.77 333.217 634.971 344.027 629.758 340.799C629.918 341.575 630.776 342.639 630.864 343.331C630.976 344.192 630.138 345.51 630.381 346.253C630.6 346.922 632.89 348.881 633.445 349.998C635.634 354.386 637.181 359.437 638.26 364.217C639.384 369.2 640.75 376.104 636.623 379.544C635.631 380.37 634.767 380.592 633.749 381.585C633.63 382.503 633.211 383.262 632.492 383.861C632.098 383.972 631.781 383.874 631.544 383.567C630.286 384.249 630.705 381.384 629.227 384.168C628.87 384.84 629.514 387.145 629.195 386.908C628.615 386.481 626.866 384.656 626.299 384.622C625.03 386.349 625.059 384.59 623.719 384.836C623.666 385.552 623.278 385.946 622.554 386.017C621.989 385.888 621.425 385.757 620.861 385.627C617.448 385.647 612.407 384.215 609.13 383.31C602.875 381.583 598.412 377.279 597.055 370.758C594.229 357.174 605.654 340.193 613.822 330.316C616.612 326.942 636.207 305.041 639.232 317.451ZM693.781 361.213C693.693 362.354 694.046 364.059 692.764 364.185C692.822 362.898 692.281 361.249 693.781 361.213ZM604.781 359.279C605.364 362.568 605.498 360.69 604.175 362.952C603.73 361.62 603.932 360.396 604.781 359.279ZM699.491 355.038C699.999 355.67 701.944 357.376 700.269 357.813C698.804 358.194 699.429 355.817 699.491 355.038ZM629.022 332.238C628.356 335.777 630.363 334.93 633.124 334.287C631.757 333.604 630.389 332.921 629.022 332.238ZM117.271 189.469C104.045 200.818 103.646 220.663 104.063 236.637C104.63 258.342 105.947 280.107 108.045 301.716C108.993 311.48 111.778 316.452 121.416 319.724C131.857 323.268 143.103 322.582 153.933 321.953C151.862 305.852 147.809 284.669 163.96 273.953C165.438 272.973 166.79 272.249 168.589 272.156C169.777 272.095 171.481 273.172 172.609 272.621C174.89 271.506 173.585 268.348 172.838 266.561C170.567 261.129 166.233 256.782 162.717 252.173C158.301 246.387 154.507 246.543 147.913 247.257C145.284 247.543 134.942 248.721 136.978 243.108C138.457 239.027 146.582 240.049 149.874 239.104C152.369 238.387 152.878 238.071 152.771 235.521C152.602 231.536 150.317 230.454 146.772 230.563C142.212 230.702 134.317 233.126 130.52 229.54C125.098 224.418 133.139 220.832 137.216 220.136C141.484 219.408 147.192 220.071 148.177 214.788C149.115 209.749 146.457 203.651 144.38 199.214C142.37 194.922 139.623 189.452 135.429 186.875C129.511 183.24 122.21 185.23 117.271 189.469ZM168.605 284.287C163.233 285.492 160.142 292.487 159.518 297.378C158.915 302.109 159.326 308.861 162.795 312.497C167.348 317.268 175.285 316.947 180.185 321.425C182.356 310.649 186.37 300.279 191.643 290.65C187.479 289.503 183.421 288.02 179.315 286.689C176.311 285.716 171.831 283.563 168.605 284.287ZM513.437 307.502C514.642 308.532 515.023 308.845 515.334 310.462C512.474 310.643 513.335 309.724 513.437 307.502ZM541.803 230.852C546.273 230.968 548.363 232.415 551.95 234.557C554.506 236.084 557.607 234.441 557.607 238.32C564.904 232.585 578.512 247.393 583.627 251.272C589.023 255.363 594.336 260.179 594.933 267.48C595.11 269.642 594.662 271.858 594.987 274.011C595.232 275.633 596.259 277.254 596.084 278.936C595.878 280.886 594.229 282.026 593.849 283.859C593.699 284.585 594.213 286.043 593.894 286.63C590.623 292.627 586.431 297.547 579.254 298.14C573.003 298.657 566.097 296.426 561.541 292.064C557.499 288.195 555.089 282.397 554.042 276.975C553.86 276.037 554.205 273.888 553.896 273.095C553.447 271.939 552.771 271.919 552.214 270.984C550.737 268.504 548.617 263.83 550.534 261.105C545.808 262.172 542.216 252.046 540.452 249.093C539.129 246.882 535.941 245.151 535.056 243C533.842 240.05 538.204 238.784 536.693 236.729C535.884 235.629 531.542 236.378 531.968 233.622C532.364 231.073 540.096 230.807 541.803 230.852ZM633.355 282.106C633.398 282.16 633.442 282.192 633.486 282.203L633.471 282.19L633.355 282.106ZM620.878 260.026C621.288 259.674 623.484 257.451 623.742 259.118C623.953 260.484 621.535 260.026 620.878 260.026ZM415.951 86.8577C411.185 87.1487 406.937 92.2937 403.387 94.9947C398.086 99.0267 391.822 101.987 385.575 104.225C378.303 106.828 370.828 109.145 363.362 111.12C355.789 113.124 347.901 113.534 340.352 115.616C344.087 122.452 347.823 129.289 351.559 136.126C353.197 133.871 352.637 131.325 355.333 129.704C357.204 128.579 359.912 128.425 362.027 128.009C367.915 126.85 374.376 125.824 380.353 127.023C384.209 127.797 388.5 130.766 384.848 134.912C382.543 137.528 377.582 136.856 377.177 141.011C376.789 144.992 380.854 148.412 379.913 152.598C378.59 158.482 372.711 156.72 370.097 152.916C367.766 149.524 368.65 143.492 365.051 141.046C362.904 139.587 357.165 139.061 354.853 140.31C359.102 148.152 367.36 157.821 362.516 167.196C361.027 170.076 357.775 171.174 359.955 174.004C362.469 177.268 369.723 179.957 373.585 178.958C377.201 178.023 381.344 173.949 385.411 175.965C389.251 177.868 386.53 181.099 386.869 184.088C387.891 193.091 406.355 187.956 411.368 186.761C416.397 185.563 421.644 182.664 426.835 182.545C431.731 182.432 436.277 184.792 440.156 187.556C443.061 189.626 447.895 195.682 451.58 195.884C455.278 196.087 460.519 190.613 463.782 188.956C469.636 185.982 476.035 185.122 482.239 183.14C483.224 182.826 487.527 181.941 487.605 180.504C487.678 179.123 482.592 176.102 481.728 175.442C473.835 169.415 468.054 161.106 459.843 155.462C456.182 152.945 452.227 151.171 447.95 150.038C445.576 149.41 439.112 148.563 438.942 145.178C450.331 143.27 450.615 129.061 445.812 121.004C442.757 115.88 438.018 113.443 432.032 114.545C423.358 116.143 421.772 122.492 419.786 130.026C412.698 126.17 404.971 116.727 404.55 108.406C404.083 99.1547 414.016 95.1767 415.951 86.8577ZM627.546 149.03C639.496 151.247 651.185 154.202 662.693 158.129C669.781 160.548 680.094 162.628 686.224 167.166C688.013 168.492 690.267 171.408 688.634 173.738C687.227 175.747 683.782 175.206 681.746 174.893C672.494 173.47 663.43 169.598 654.277 167.51C629.95 161.962 604.993 159.355 580.139 157.579C573.285 157.09 566.426 156.667 559.572 156.185C553.864 155.785 547.591 155.966 542.002 154.674C537.594 153.655 536.496 150.416 539.797 146.769C543.015 143.215 548.413 143.769 552.724 143.12C577.808 141.482 602.91 144.459 627.546 149.03ZM585.973 120.001C594.105 122.803 584.601 124.139 581.044 123.845C579.838 123.746 563.932 122.168 563.932 122.657C560.757 122.657 552.358 125.085 550.078 121.875C547.629 118.428 558.113 117.218 560.232 117.065C568.379 116.478 578.142 117.304 585.973 120.001Z"
        fill={theme.palette.text.primary}
      />
    </svg>
  );
}
