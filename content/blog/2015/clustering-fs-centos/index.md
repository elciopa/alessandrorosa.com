---
title: Clustering a file system with CentOS 7
date: 2015-02-18
description: # Add post description (optional)
img: ./taylor-vick-M5tzZtFCOfs-unsplash.jpg # Add image post (optional)
tags: [CentOS, Clusterd File System RHEL, Corosync, GFS2, STONITH, Peacemake]
---

This time I wanted to build up a Cluster for GeoServer. Suppose to have many requests to serve and tasks processed are really high cpu intensive, what you would initially think as first option is to put 2 GeoServers and with a simple proxy balancer switch the traffic 50-50 to each of the 2 nodes. That's correct, but since the 2 instances have their own "installation" directory they could theoretically provide different data, styles, shapefiles, users and so on.

As explained in many documents or books (e.g [Geoserver. Beginner's Guide])  the concurrence is not a problem for data who reside on DBs, but what happens for other useful data? (shapefiles and styles in particular). You should pay twice the space, by duplicating them, and moreover you should keep care of syncing all of them!

What was suggested, even from the link of above, was to think about a [clustered file system]. So how could you do it? Trash away all the documentation about ricci, lucci and so on these stuffs are outdated.

Since Cent OS 7 the way to follow is Corosync, Peacemaker and STONITH : "thanks God for it". As written in my previous topics even SLES is supporting these "packages" for clusterized environments and this is a convergence point of many distros for the moment.

What I did was fairly simple, my hardware/OS was:

- 2 HP ProLiant DL380 G8
- 1 SAN HP MSA 1040 (many disks configured as a RAID 10)
- ESXi 5.5 U2 (Hypervisor)
- CentOS 7

Create the 2 virtual servers, one per host, with the CentOS 7.

After that you have to enable the "shared disk" which will be mounted from both servers. So for that you're going to create a dedicated SCSI controller (of type VMParavirtual) and a SCSI Bus Sharing of Physical type. The difference between Physical and Virtual is that the first way let you mount disks on 2 different hosts, wheras the virtual one let you mount disks "only" on the same host. In our case we want to do a cluster on the 2 different host, so we are going to choose the Physical one. I suggest you to remove all snapshots if you have them. Now that you have the controller create a new disk of 10 gigs (in my case) and attach it to the new scsi controller.

Now do the same with the second virtual server, add the shared scsi controller with the same configuration but remember to add an "existing disk" and search it from the folder of the virtual server created before: you will find the 10 gigs vmdk to add. (this is important, you don't have to create a new disk, but to attach the existing one).

Boot up both virtual servers and then .. follow this amazing guide: [Cluster from Scratch].

It's definitly a brilliant guide which will explain commands, components to use, services, features and everything you need: including the GFS2 (the clustered file system officially supported from CentOS). These are the documents we want to see, clusterlabs.org did a really good job. Here you could also find it translated in many [other languages].


[Geoserver. Beginner's Guide]: https://books.google.it/books?id=mbpsw5QJF54C&lpg=PT423&ots=SW20iZDnQS&dq=geoserver%20beginners%20guide%20cluster&hl=it&pg=PT422#v=onepage&q=geoserver%20beginners%20guide%20cluster&f=false
[clustered file system]: http://en.wikipedia.org/wiki/Clustered_file_system
[Cluster from Scratch]: http://clusterlabs.org/doc/Cluster_from_Scratch.pdf
[other languages]: http://clusterlabs.org/doc/