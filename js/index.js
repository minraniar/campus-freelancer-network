// MOBILE SIDEBAR
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');

            sidebar.classList.toggle('show');
            overlay.classList.toggle('hidden');
        }


        // NOTIFICATION
        function showNotification() {
            alert('Belum ada notifikasi baru.');
        }


        // HIGHCHARTS
        Highcharts.chart('activityChart', {

            chart: {
                type: 'areaspline',
                backgroundColor: 'transparent',
                height: 300,
                spacing: [10, 5, 5, 5]
            },

            title: {
                text: null
            },

            credits: {
                enabled: false
            },

            legend: {
                enabled: false
            },

            xAxis: {
                categories: [
                    'Januari',
                    'Februari',
                    'Maret',
                    'April',
                    'Mei',
                    'Juni'
                ],
                lineColor: '#E2E8F0',
                tickColor: '#E2E8F0',
                labels: {
                    style: {
                        color: '#94A3B8',
                        fontSize: '11px'
                    }
                }
            },

            yAxis: {
                title: {
                    text: null
                },
                gridLineColor: '#F1F5F9',
                labels: {
                    style: {
                        color: '#94A3B8'
                    }
                },
                min: 0
            },

            tooltip: {
                shared: true,
                backgroundColor: '#172554',
                borderWidth: 0,
                style: {
                    color: '#FFFFFF'
                },
                borderRadius: 10
            },

            plotOptions: {
                areaspline: {
                    fillOpacity: 0.12,
                    lineWidth: 3,
                    marker: {
                        enabled: true,
                        radius: 4
                    }
                }
            },

            series: [{
                name: 'Proyek',
                data: [25, 38, 32, 55, 68, 85],
                color: '#2563EB'
            }]

        });